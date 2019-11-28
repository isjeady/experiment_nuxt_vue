<template>
        <div class="flex md:flex-row-reverse flex-wrap border rounded mt-3 ">
            <div class="w-full md:w-5/6 bg-gray-100 p-4 text-left text-gray-700">
                <div class="text-gray-900 font-bold text-xl mb-2">{{ item.name }}</div>
                <p class="text-gray-700 text-base">{{ item.description }}</p>
                <div class="text-gray-900 font-bold text-md mb-2">{{ item.price }} €</div>
            </div>
            <div class="w-full md:w-1/6 bg-gray-200 p-4 text-center text-gray-200">
                <img :src="item.image" />
            </div>
        </div>
</template>



<script>
export default {
        name: 'ItemSearch',
        props : {
            item : {
                required : true,
                type: Object
            }
        }
}
</script>