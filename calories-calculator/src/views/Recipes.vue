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
                                    Calories
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
                            <tr v-for="recipe in recipes" :key="recipe.id">
                                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    {{ recipe.title }}
                                </td>
                                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    {{ recipe.author }}
                                </td>
                                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    {{ recipeCalories(recipe) }}
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
       :title="editing ? 'Modifier la recette' : 'Créer une recette'"
       @close="closeSlideOver" >
    
        <template #content>
            <div class="flex flex-col gap-4">
                <div>
                    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">
                        Titre
                    </label>
                    <div class="mt-2">
                        <input type="title" name="title" id="title"
                            v-model="recipe.title"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 focus:outline-none sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="author" class="block text-sm font-medium leading-6 text-gray-900">
                        Auteur
                    </label>
                    <div class="mt-2">
                        <input type="author" name="author" id="author" 
                            v-model="recipe.author"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 focus:outline-none sm:text-sm sm:leading-6" />
                    </div>
                </div>
                
                <Listbox as="div" v-model="recipe.ingredients" multiple>
                    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                        Ingrédients
                    </ListboxLabel>
                    <div class="relative mt-2">
                        <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm sm:leading-6">
                            <span v-if="recipe.ingredients.length > 0" class="block truncate">
                                {{ recipe.ingredients.map((ingredient) => ingredient.name).join(', ') }}
                            </span>
                            <span class="block truncate text-gray-500">
                                Sélectionnez un ou plusieurs ingrédients
                            </span>
                            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </ListboxButton>

                        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                            <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <ListboxOption as="template" v-if="ingredients.length > 0"
                                    v-for="ingredient in ingredients" :key="ingredient.name"
                                    :value="ingredient"
                                    v-slot="{ active, selected }">
                                    <li :class="[active ? 'bg-emerald-500 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                            {{ ingredient.name }}
                                        </span>
                                        <span v-if="selected" :class="[active ? 'text-white' : 'text-emerald-500', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    </li>
                                </ListboxOption>
                                <div v-else>
                                    <span class="py-2 pl-3 pr-9 font-normal tet-gray-700">
                                        Aucun ingrédient
                                    </span>
                                </div>
                            </ListboxOptions>
                        </transition>
                    </div>
                </Listbox>
            </div>
        </template>
    </SlideOver>
</template>

<script setup>
    import { ref, computed } from 'vue';

    import { PencilSquareIcon, TrashIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid';
    import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';

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
    const ingredients = ref([]);

    const openSlideOver = ref(false);
    const editing = ref(false);
    const recipe = ref({
        title: '',
        author: '',
        ingredients: [],
        steps: []
    });

    const recipeCalories = (recipe) => {
        let calories = 0;
        recipe.ingredients.forEach(ingredient => calories = calories + ingredient.calories);
        return calories;
    }

    const createRecipe = () => {
        openSlideOver.value = true;
    };
    const editRecipe = (editRecipe) => {
        openSlideOver.value = true;
        editing.value = true;
        recipe.value = editRecipe;
    };
    const deleteRecipe = (recipe) => console.log('delete ' + recipe.id);

    const closeSlideOver = () => {
        openSlideOver.value = false;
        recipe.value = {
            title: '',
            author: '',
            ingredients: [],
            steps: []
        };
    };
</script>