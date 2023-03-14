<template>
    <div class="bg-white py-8">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:text-center">
                <h2 class="text-base font-semibold leading-7 text-amber-600">
                    Calculateur de calories
                </h2>
                <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Les informations essentielles de vos recettes préférées
                </p>
                <p class="mt-6 text-lg leading-8 text-gray-600">
                    Notre application vous permet de calculer facilement le nombre de calories de n'importe quelle recette. Que vous cuisiniez à la maison ou au restaurant, vous pourrez prendre des décisions plus éclairées sur votre alimentation grâce à notre outil pratique et rapide.
                </p>
            </div>
            <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl class="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                    <div v-for="hilight in hilights" :key="hilight.name" class="relative pl-16">
                        <dt class="text-base font-semibold leading-7 text-gray-900">
                            <div class="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
                                <component :is="hilight.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            {{ hilight.name }}
                        </dt>
                        <dd class="mt-2 text-base leading-7 text-gray-600">
                            {{ hilight.description }}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { CalculatorIcon, DocumentTextIcon, SparklesIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline';

    const hilights = [
        {
            name: 'X recettes',
            description:
            'Consultez la liste de nos recettes. Elles sont collaboratives et chacun peut apporter sa pierre à l\'édifice pour une meilleure alimentation.',
            icon: DocumentTextIcon,
        },
        {
            name: 'X ingrédients',
            description:
            'Ajoutez vous-même des recettes en les construisant à partir de notre liste d\'ingrédients. Si vous ne trouvez pas votre bonheur, n\'hésitez pas à en ajouter !',
            icon: ShoppingCartIcon,
        },
        {
            name: 'Calculateur',
            description:
            'Importez vos propres recettes afin de connaître leur teneur en calories. Vous pouvez par la suite les sauvegarder afin de les ajouter à notre base de données.',
            icon: CalculatorIcon,
        },
        {
            name: 'Partagez-nous votre avis !',
            description:
            'Il s\'agit d\'une première version de l\'application, nous avons déjà des améliorations dans les tuyaux. Cependant nous serions ravis d\'entendre votre avis et vos suggestions !',
            icon: SparklesIcon,
        },
    ];
</script>