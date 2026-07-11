const addToCart = async (item) => {

    try {

        await addCart({

            productId: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1

        });

        fetchCart();

    }

    catch (err) {

        console.log(err);

    }

};