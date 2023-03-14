<template>
    <div class="py-6 px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold leading-6 text-gray-900">
                    Recettes
                </h1>
                <p class="mt-2 text-sm text-gray-700">
                    Liste complète des recettes enregistrées. Cliquez sur une recette pour afficher ses détails (ingrédients et étapes de préparation). Vous pouvez également éditer ou supprimer n'importe quelle recette.
                </p>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button @click="createRecipe" type="button" class="block rounded-md bg-emerald-500 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                    Ajouter une recette
                </button>
            </div>
        </div>

        <div class="mt-8 flow-root">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">

                        <thead>
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Titre
                                </th>
                                <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Auteur
                                </th>
                                <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Publication
                                </th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="recipe in recipes" :key="recipe.email">
                                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    {{ recipe.title }}
                                </td>
                                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    {{ recipe.author }}
                                </td>
                                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    {{ recipe.publication_date }}
                                </td>
                                <td class="flex flex-row gap-4 py-4 pl-3 w-fit">
                                    <div @click="editRecipe(recipe)" class="cursor-pointer">
                                        <PencilSquareIcon class="w-5 h-5 text-blue-500 hover:text-blue-400" />
                                        <span class="sr-only">Éditer</span>
                                    </div>
                                    <div @click="deleteRecipe(recipe)" class="cursor-pointer">
                                        <TrashIcon class="w-5 h-5 text-red-500 hover:text-red-400" />
                                        <span class="sr-only">Supprimer</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <SlideOver
       :open="openSlideOver"
       :title="recipeToEdit.id ? 'Modifier la recette' : 'Créer une recette'"
       @close="closeSlideOver" >
    
        <template #content>
            {{ recipeToEdit }}
        </template>
    </SlideOver>
</template>

<script setup>
    import { ref, computed } from 'vue';

    import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';

    import SlideOver from '../components/overlays/SlideOverSlotActionFooter.vue';

    const recipes = ref([
        {
            id: 'oqeGe',
            title: 'Gateau au chocolat',
            author: 'Louise BERTIN',
            publication_date: '12/03/2023',
            ingredients: [],
            steps: []
        },
        {
            id: 'ergeqF',
            title: 'Poulet Gaston Gérard',
            author: 'Louise BERTIN',
            publication_date: '14/03/2023',
            ingredients: [],
            steps: []
        }
    ]);

    const openSlideOver = ref(false);
    const recipeToEdit = ref({});
    const newRecipe = ref({});

    const createRecipe = () => {
        openSlideOver.value = true;
    };
    const editRecipe = (recipe) => {
        openSlideOver.value = true;
        recipeToEdit.value = recipe;
    };
    const deleteRecipe = (recipe) => console.log('delete ' + recipe.id);

    const closeSlideOver = () => {
        openSlideOver.value = false;
        recipeToEdit.value = {};
    }
</script>