<template>
    <div class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <div class="text-center">
            <label for="file" class="block mt-1 text-base text-gray-500">
                Déposez votre recette ici
            </label>
            <input type="file" ref="file" name="file"
                accept=".json"
                class="mt-4 text-base"
                @change="handleFileUpload">
        </div>
    </div>
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

    const handleFileUpload = async() => {
        console.log("selected file", file.value.files);
    }

</script>