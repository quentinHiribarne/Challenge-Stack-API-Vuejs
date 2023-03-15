<template>
    <div class="flex min-h-screen">
        <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div class="flex flex-col justify-center text-center h-fit">
                    <div class="w-fit mx-auto">
                        <img class="h-36 w-auto"
                            src="../assets/logo.jpg" 
                            alt="Logo de l'application, ensemble d'icônes de nourriture dans un cercle."
                        />
                    </div>
                    <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        Accédez à l'application
                    </h2>
                    </div>

                <div class="mt-8">

                <div class="mt-6">
                    <div>
                        <button @click="generateToken"
                            type="button"
                            class="flex w-full justify-center rounded-md bg-emerald-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">
                            Entrer
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div class="relative hidden w-0 flex-1 md:block">
            <img class="absolute inset-0 h-full w-full object-cover object-right"
                src="../assets/home-banner.jpg" 
                alt="Mise en scène esthétique d'ingrédients et ustensiles pour une recette de spaghetti et tomates." />
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from "vue-router";

    const router = useRouter();

    const generateToken = () => {
        localStorage.token = 'fauxTokenCeciEstUnTest';
        router.push({ name: 'home' });
    };
</script>