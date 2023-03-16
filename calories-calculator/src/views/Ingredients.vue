<template>
    <div class="py-6 px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold leading-6 text-gray-900">
                    Ingrédients
                </h1>
                <p class="mt-2 text-sm text-gray-700">
                    Liste complète des ingrédients enregistrées. Vous pouvez éditer ou supprimer n'importe quel ingrédient.
                </p>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button @click="showSlideOver = true" type="button" class="block rounded-md bg-emerald-500 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                    Ajouter un ingrédient
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
                                    Nom
                                </th>
                                <th scope="col" class="hidden sm:table-cell py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Description
                                </th>
                                <th scope="col" class="hidden sm:table-cell py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Nutrition
                                </th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="ingredient in ingredients" :key="ingredient.id">
                                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                                    {{ ingredient.name }}
                                </td>
                                <td class="hidden sm:table-cell py-4 px-3 text-sm text-gray-700 max-w-sm">
                                    {{ ingredient.description }}
                                </td>
                                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    <div class="flex flex-col gap-1">
                                        <span v-for="value, key, idx in ingredient.nutrition" :key="idx"
                                            class="inline-flex items-center w-fit rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                                            {{ value + ' ' + key }}
                                        </span> 
                                    </div>
                                </td>
                                <td class="py-4 pl-3 w-fit">
                                    <div class="flex flex-col sm:flex-row gap-4">
                                        <div @click="openEditForm(ingredient)" class="cursor-pointer">
                                            <PencilSquareIcon class="w-5 h-5 text-blue-500 hover:text-blue-400" />
                                            <span class="sr-only">Éditer</span>
                                        </div>
                                        <div @click="deleteIngredient(ingredient.id)" class="cursor-pointer">
                                            <TrashIcon class="w-5 h-5 text-red-500 hover:text-red-400" />
                                            <span class="sr-only">Supprimer</span>
                                        </div>
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
       @save="saveIngredient" >
    
        <template #content>
            <div class="flex flex-col gap-4">
                <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">
                        Nom
                        <span class="text-red-500">*</span>
                    </label>
                    <div class="mt-2">
                        <input type="text" name="name" id="name"
                            v-model="ingredient.name"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 focus:outline-none sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="description" class="block text-sm font-medium leading-6 text-gray-900">
                        Description
                        <span class="text-red-500">*</span>
                    </label>
                    <div class="mt-2">
                        <textarea name="description" id="description" 
                            v-model="ingredient.description"
                            class="block w-full rounded-md border-0 py-1.5 px-2 sm:text-sm sm:leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 focus:outline-none" />
                    </div>
                </div>
                <div class="pt-2 border-t border-gray-300">
                    <p class="block text-sm font-medium leading-6 text-gray-500">
                        Informations nutritionnelles
                    </p>
                    <div class="sm:grid sm:grid-cols-2 gap-4 mt-2">
                        <div>
                            <label for="calories" class="block text-sm font-medium leading-6 text-gray-900">
                                Calories
                            </label>
                            <div class="mt-2">
                                <input type="text" name="calories" id="calories" 
                                    v-model="ingredient.nutrition.calories"
                                    class="block w-full rounded-md border-0 py-1.5 px-2 sm:text-sm sm:leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label for="fat" class="block text-sm font-medium leading-6 text-gray-900">
                                Gras
                            </label>
                            <div class="mt-2">
                                <input type="text" name="fat" id="calories" 
                                    v-model="ingredient.nutrition.fat"
                                    class="block w-full rounded-md border-0 py-1.5 px-2 sm:text-sm sm:leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label for="carbo" class="block text-sm font-medium leading-6 text-gray-900">
                                Carbohydrates
                            </label>
                            <div class="mt-2">
                                <input type="text" name="carbo" id="carbo" 
                                    v-model="ingredient.nutrition.carbohydrates"
                                    class="block w-full rounded-md border-0 py-1.5 px-2 sm:text-sm sm:leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label for="protein" class="block text-sm font-medium leading-6 text-gray-900">
                                Protéines
                            </label>
                            <div class="mt-2">
                                <input type="text" name="protein" id="protein" 
                                    v-model="ingredient.nutrition.protein"
                                    class="block w-full rounded-md border-0 py-1.5 px-2 sm:text-sm sm:leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </template>
    </SlideOver>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';

    import { Ingredients as IngredientsAPI } from '../API';

    import { PencilSquareIcon, TrashIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid';
    import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';

    import SlideOver from '../components/overlays/SlideOverSlotActionFooter.vue';
    import Modal from '../components/overlays/ModalSimpleSlot.vue';

    const ingredients = ref([]);

    const showSlideOver = ref(false);
    const editing = ref(false);
    const ingredient = ref({
        name: '',
        description: '',
        nutrition: {
            calories: 0,
            fat: 0,
            carbohydrates: 0,
            protein: 0
        }
    });

    const isValid = computed(() => !ingredient.value.name || !ingredient.value.description ? false : true);

    const createIngredient = () => {
        showSlideOver.value = true;
    };
    const openEditForm = (ingredientToEdit) => {
        showSlideOver.value = true;
        editing.value = true;
        ingredient.value = ingredientToEdit;
    };
    const deleteIngredient = async (id) => ingredients.value = await IngredientsAPI.deleteIngredient(id, localStorage.token);

    const saveIngredient = async () => {
        if (editing.value) {
            console.log('update');
            ingredients.value = await IngredientsAPI.updateIngredient(ingredient.value, localStorage.token);

        } else {
            console.log('create');
            ingredients.value = await IngredientsAPI.createIngredient(ingredient.value, localStorage.token);
        }

        closeSlideOver();
    };

    const closeSlideOver = () => {
        showSlideOver.value = false;
        ingredient.value = {
            name: '',
            description: '',
            nutrition: {
                calories: 0,
                fat: 0,
                carbohydrates: 0,
                protein: 0
            }
        };
    };

    onMounted( async () => {
        ingredients.value = await IngredientsAPI.getIngredients(localStorage.token);
    });
</script>