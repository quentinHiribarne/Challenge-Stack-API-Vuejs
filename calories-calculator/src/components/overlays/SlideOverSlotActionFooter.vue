<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="$emit('close')">
            <div class="fixed inset-0" />

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-sm">
                                <div class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                    <div class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                                        <div class="px-4 sm:px-6">
                                            <div class="flex items-start justify-between">
                                                <DialogTitle class="text-base font-semibold leading-6 text-gray-900">
                                                    {{ title }}
                                                </DialogTitle>
                                                <div class="ml-3 flex h-7 items-center">
                                                    <button type="button" 
                                                        class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                        @click="$emit('close')">
                                                        <span class="sr-only">Fermer</span>
                                                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                            <slot name="content" />
                                        </div>
                                    </div>
                                    <div class="flex flex-shrink-0 justify-end px-4 py-4">
                                        <button type="button"
                                            @click="$emit('close')"
                                            class="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                                            Annuler
                                        </button>
                                        <button type="submit"
                                            :disabled="!isValid"
                                            @click="$emit('save')"
                                            class="ml-4 inline-flex justify-center rounded-md bg-emerald-500 disabled:bg-gray-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 disabled:hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">
                                            Sauvegarder
                                        </button>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
    import { ref } from 'vue'
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { XMarkIcon } from '@heroicons/vue/24/outline'

    const props = defineProps({
        open: {
            type: Boolean,
            default: false
        },
        isValid: {
            type: Boolean,
            default: true
        },
        title: String
    });

    defineEmits(['close', 'save'])
</script>