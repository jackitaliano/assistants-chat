<!-- This is an example for a Svelte browser app, if you are using SvelteKit, please see the following example: https://codesandbox.io/p/sandbox/deep-chat-sveltekit-fn8h6x -->

  <script>
    import { onMount } from 'svelte';
    import { Navbar, Sidebar, MyDeepChat, Login } from './components';
    import { BIDARA_CONFIG } from './assistant/bidara';
    import { funcCalling } from './assistant/bidaraFunctions';
    import { getKeyAsstAndThread  } from './utils/openaiUtils';
    import { setThread, getThread, deleteThreadFromThreads, getNewThread, getThreads, setThreads, setActiveThreadName, updateThreadAndThreads, getEmptyThreads } from './utils/threadUtils';
    import hljs from "highlight.js";
    window.hljs = hljs;
  
    let loggedIn = false;
    let open = false;
    let activeKey = null;
    let activeThread = null;
    let activeAsstId = null;
    let activeAsstConfig = null;
    let threads = null;
    let loading = true;
    let activeFuncCalling = funcCalling;

    let activeInitialMessages = [
      { role: "ai", text: "Hi, I'm **BIDARA**, Bio-Inspired Design and Research Assisant. I'm an OpenAI [GPT-4](https://openai.com/research/gpt-4) [assistant](https://platform.openai.com/docs/assistants/how-it-works), that was instructed by [NASA's PeTaL initiative](https://www1.grc.nasa.gov/research-and-engineering/vine/petal/) to help others understand, learn from, and emulate the strategies used by living things to create sustainable designs and technologies using the [Biomimicry Institute's design process](https://toolbox.biomimicry.org/methods/process/)." },
      { role: "ai", text: "Before we begin, please be advised:\n\n‣ **Do not share any sensitive information** in your conversations including but not limited to, personal information, sensitive or non-public government/company data, ITAR, CUI, export controlled, or trade secrets.  \n‣ While OpenAI has safeguards in place, BIDARA may occasionally generate incorrect or misleading information and produce offensive or biased content." },
      { role: "ai", text: "How can I assist you today?" }
    ];

    onMount(async () => {
      await initKeyAsstAndThreads();
    });

    async function initKeyAsstAndThreads() {
      console.log("init");
      const keyAsstAndThread = await getKeyAsstAndThread();

      if (!keyAsstAndThread[0]) {
        return;
      }

      activeKey = keyAsstAndThread[0];
      activeAsstId = keyAsstAndThread[1];
      activeThread = keyAsstAndThread[2];

      activeAsstConfig = BIDARA_CONFIG

      threads = getThreads();

      loggedIn = true;
      console.log("Init done");
      console.dir(keyAsstAndThread);
    }

    async function newThreadAndSwitch() {
      console.log('try new thread');
      console.log('active thread: ');
      console.log(activeThread);
      // If the thread is already "new", stay on it
      if (activeThread && activeThread.length <= 0) {
        if (activeThread.name != "New Chat") {
          await renameActiveThread("New Chat");
        }
        return true;
      } 

      // If an empty thead is already created, prevents creating a new one
      const emptyThreads = getEmptyThreads();
      if (emptyThreads && emptyThreads.length >= 1) {

        const emptyThread = emptyThreads[0];
        switchActiveThread(emptyThread);

        return true;
      }

      const thread = await getNewThread();
      threads.unshift(thread);

      setThreads(threads);

      await switchActiveThread(thread);
      
      return true;
    }

    async function deleteThreadAndSwitch(thread) {

      threads = deleteThreadFromThreads(thread.id);
      activeThread = {};
      if (threads && threads.length > 0) {
        switchActiveThread(threads[0]);
      } else {
        await newThreadAndSwitch();
      }

      return true;
    }

    
    async function switchActiveThread(thread) {
      if (thread.id === activeThread.id) {
        return;
      }
      loading = true;

      await setThread(thread);
      const keyAsstAndThread = await getKeyAsstAndThread();
      activeThread = keyAsstAndThread[2];

      return true;
    }

    async function renameActiveThread(name) {
      await setActiveThreadName(name);

      threads = getThreads();
      activeThread = await getThread();

      return true;
    }

    async function updateThread(thread) {
      console.log('threadlen: ' + thread.length);
      const updateThreads = threads;
      updateThreadAndThreads(thread, updateThreads);
    }
  </script>

<main class="flex">
  <div class="w-full h-full">
    {#key loggedIn}
    {#if !loggedIn}
      <Login loginHandler={initKeyAsstAndThreads} />

    {:else}
      <Navbar bind:chat_name={activeThread.name} bind:sidebar={open} handleRename={renameActiveThread}/>   

      <div id="content-container" class="flex justify-between" class:open>
        <div>
          <Sidebar handleChatSelect={switchActiveThread} handleChatDelete={deleteThreadAndSwitch} handleChatNew={newThreadAndSwitch} bind:threads bind:open bind:selectedThreadId={activeThread.id}/>
        </div>

        {#key activeThread}
        <div id="chat-container" class:loading>
          <MyDeepChat
            key={activeKey}
            asstId={activeAsstId}
            asstConfig={activeAsstConfig}
            thread={activeThread}
            funcCalling={activeFuncCalling}
            initialMessages={activeInitialMessages}
            updateThread={updateThread}
            loginHandler={null}
            bind:loading

            width="100%"
            height="100%"
            />
        </div>
        {/key}
      </div>

    {/if}
    {/key}
  </div>
</main>


<style>
  #content-container {
    width: 100%;
    height: calc(100% - 3rem);
  }

  #chat-container {
    width: 100%;
    height: 100%;
    margin-left: 0;
    transition: width 0.3s ease, filter 0.3s ease-out;
  }
  
  .open #chat-container {
    width: 80%;
  }

  @media only screen and (max-width: 1400px) {
    .open #chat-container {
      width: 70%;
    }
  }

  @media only screen and (max-width: 1000px) {
    .open #chat-container {
      width: 60%;
    }
  }

  @media only screen and (max-width: 700px) {
    .open #chat-container {
      width: 100%;
    }
  }

  main {
    font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    width: 100%;
    height: calc(100% + env(safe-area-inset-top));
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }


	.loading {
		filter: blur(2px);
	}

</style>

