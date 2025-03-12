<script setup lang="ts">
import { useChat } from '@ai-sdk/vue';
import VueMarkdown from 'vue-markdown-render';
import { dateFormatter } from '~/utils/formatter';
const { messages, input, status, handleSubmit } = useChat();
</script>

<template>
  <div class="h-screen">
    <div class="flex flex-col max-w-4xl mx-auto py-12 gap-4 h-full">
      <h1 class="text-4xl text-center">Vue/Nuxt AI Chat</h1>
      <hr class="border border-gray-600">
      <div class="h-full scroll-auto overflow-y-auto">
        <ul class="flex flex-col gap-2">
          <li v-for="m in messages" :key="m.id" :class="{'ml-auto w-2/3 rounded-md bg-gray-200': m.role === 'user'}" class="p-4 ">
            <div class="flex flex-col gap-2" ref="chat">
              <p><span class="font-bold">{{ m.role === 'user' ? "👤 User" : "🤖 LLM" }}</span> at {{ dateFormatter.format(m.createdAt) }}</p>
              <template v-if="m.role === 'user'">
                <p class="whitespace-pre-wrap">{{ m.content }}</p>
              </template>
              <template v-else>
                <VueMarkdown :source="m.content"/>
              </template>
            </div>
          </li>
          <div v-if="status === 'submitted'" class="w-5 h-5 border-4 border-t-transparent border-zinc-800 rounded-full animate-spin"></div>
        </ul>
      </div>
      <form @submit="handleSubmit" class="flex gap-2">
        <input :disabled="status === 'submitted'" v-model="input" placeholder="Ask anything..." type="text" class="disabled:bg-gray-200 rounded-md border border-gray-600 w-full p-2 h-[42px]">
        <button type="submit" class="rounded-md border border-gray-600 px-2 cursor-pointer hover:bg-gray-600 hover:text-white">Enviar</button>
      </form>
    </div>
  </div>
  
</template>
