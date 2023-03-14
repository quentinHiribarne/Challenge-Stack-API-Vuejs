<template>
    <button type="button" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
        <div class="text-center">
            <p class="mt-1 text-sm text-gray-500">
                Déposez votre recette ici
            </p>
            <div class="mt-6">
                <button type="button" class="inline-flex items-center rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
                    <ArrowDownTrayIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Sélectionner un fichier
                </button>
            </div>
        </div>
    </button>
    <div class="flex justify-center mt-8">
        <button @click="analyze" type="button" class="inline-flex items-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            Analyser
        </button>
    </div>

    <div v-if="result">
        <h3>
            Rapport d'analyse :
        </h3>
        <p>
            {{ result.calories }}
        </p>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    import { ArrowDownTrayIcon } from '@heroicons/vue/20/solid';

    const file = ref(null);
    const result = ref(null);

    const analyse = () => console.log("résultat de l'analyse de 'file'");
</script>