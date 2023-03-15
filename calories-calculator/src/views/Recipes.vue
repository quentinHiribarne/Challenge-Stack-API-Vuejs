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
                <button @click="showSlideOver = true" type="button" class="block rounded-md bg-emerald-500 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
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
                                <th scope="col" class="hidden sm:table-cell py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Auteur
                                </th>
                                <th scope="col" class="hidden sm:table-cell py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Calories
                                </th>
                                <th scope="col" class="sm:hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Cal
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
                            <tr v-for="recipe in recipes" :key="recipe.id"
                                class="cursor-pointer hover:bg-gray-50">
                                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500"
                                    @click="openRecipe(recipe)">
                                    {{ recipe.title }}
                                </td>
                                <td class="hidden sm:table-cell whitespace-nowrap py-4 px-3 text-sm text-gray-500"
                                    @click="openRecipe(recipe)">
                                    {{ recipe.author }}
                                </td>
                                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500"
                                    @click="openRecipe(recipe)">
                                    {{ recipe.totalCalories }}
                                </td>
                                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500"
                                    @click="openRecipe(recipe)">
                                    {{ recipe.publication_date }}
                                </td>
                                <td class="flex flex-col sm:flex-row gap-4 py-4 pl-3 w-fit">
                                    <div @click="openEditForm(recipe)" class="cursor-pointer">
                                        <PencilSquareIcon class="w-5 h-5 text-blue-500 hover:text-blue-400" />
                                        <span class="sr-only">Éditer</span>
                                    </div>
                                    <div @click="deleteRecipe(recipe.id)" class="cursor-pointer">
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
       :open="showSlideOver"
       :title="editing ? 'Modifier la recette' : 'Créer une recette'"
       :isValid="isValid"
       @close="closeSlideOver"
       @save="saveRecipe" >
    
        <template #content>
            <div class="flex flex-col gap-4">
                <div>
                    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">
                        Titre
                        <span class="text-red-500">*</span>
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
                        <span class="text-red-500">*</span>
                    </label>
                    <div class="mt-2">
                        <input type="author" name="author" id="author" 
                            v-model="recipe.author"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 focus:outline-none sm:text-sm sm:leading-6" />
                    </div>
                </div>
                
                <div>
                    <Listbox as="div" v-model="recipeIngredients" multiple>
                        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                            Ingrédients
                        </ListboxLabel>
                        <div class="relative mt-2">
                            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm sm:leading-6">
                                <span v-if="recipeIngredients.length > 0" class="block truncate">
                                    {{ recipeIngredients.map((ingredient) => ingredient.name).join(', ') }}
                                </span>
                                <span v-else class="block truncate text-gray-500">
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
                    <div class="flex flex-col gap-2 mt-2">
                        <div v-for="ingredient in recipeIngredients" :key="ingredient.id"
                            class="flex gap-4 items-center">
                            <div class="flex items-center gap-2">
                                <label for="quantity" class="text-sm font-medium leading-6 text-gray-900">
                                    Quantité
                                </label>
                                <input type="number"
                                    v-model="ingredient.quantity"
                                    name="quantity" id="quantity"
                                    min="1"
                                    class="block w-fit max-w-[50px] rounded-md border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6" />
                            </div>
                            <div>
                                <span class="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                                    {{ ingredient.name }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </SlideOver>

    <Modal
       :open="showModal"
       :title="currentRecipe.title"
       @close="showModal = false">
    
        <template #content>
            <div class="flex flex-col w-full h-fit gap-4">
                <p class="text-sm text-gray-500 justify-center">
                    par {{ currentRecipe.author }}, le {{ currentRecipe.publication_date }}
                </p>
                <div v-if="currentRecipe.ingredients.length > 0">
                    <p>
                        Ingrédients :
                    </p>
                    <ul>
                        <li v-for="ingredient in currentRecipe.ingredients" :key="ingredient.name">
                            {{ ingredient.quantity + ' ' + ingredient.unit + ' ' + ingredient.name }}
                        </li>
                    </ul>
                </div>
                <div v-if="currentRecipe.steps.length > 0">
                    <p>
                        Étapes :
                    </p>
                    <ol>
                        <li v-for="step in currentRecipe.steps" :key="step.step">
                            {{ step.description }}
                        </li>
                    </ol>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';

    import { Recipes as RecipesAPI, Ingredients as IngredientsAPI } from '../API';

    import { PencilSquareIcon, TrashIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid';
    import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';

    import SlideOver from '../components/overlays/SlideOverSlotActionFooter.vue';
    import Modal from '../components/overlays/ModalSimpleSlot.vue';

    const recipes = ref([]);
    const ingredients = ref([]);

    const showModal = ref(false);
    const currentRecipe = ref({});

    const showSlideOver = ref(false);
    const editing = ref(false);
    const recipe = ref({
        title: '',
        author: '',
        ingredients: [],
        steps: []
    });
    const recipeIngredients = ref([]);

    const isValid = computed(() => !recipe.value.title || !recipe.value.author ? false : true);

    const openRecipe = (recipe) => {
        showModal.value = true;
        currentRecipe.value = recipe;
    }

    const openEditForm = (recipeToEdit) => {
        showSlideOver.value = true;
        editing.value = true;
        recipe.value = recipeToEdit;
        recipe.value.ingredients.forEach(recipeIngredient => {
            ingredients.value.forEach(ingredient => {
                if (ingredient.id == recipeIngredient.id) {
                    recipeIngredients.value.push({ name: ingredient.name, id: ingredient.id, quantity: recipeIngredient.quantity });
                }
            });
        });
    };

    const deleteRecipe = async (id) => recipes.value = await RecipesAPI.deleteRecipe(id);

    const saveRecipe = async () => {
        recipe.value.ingredients = [];
        recipeIngredients.value.forEach(recipeIngredient => {
            recipe.value.ingredients.push({ id: recipeIngredient.id, quantity: recipeIngredient.quantity });
        });
        if (editing.value) {
            console.log('update');
            recipes.value = await RecipesAPI.updateRecipe(recipe.value);
        } else {
            console.log('create');
            recipes.value = await RecipesAPI.createRecipe(recipe.value);
        }
    };

    const closeSlideOver = () => {
        showSlideOver.value = false;
        recipe.value = {
            title: '',
            author: '',
            ingredients: [],
            steps: []
        };
    };

    onMounted( async () => {
        recipes.value = await RecipesAPI.getRecipes(localStorage.token);
        ingredients.value = await IngredientsAPI.getIngredients(localStorage.token);
    });
</script>