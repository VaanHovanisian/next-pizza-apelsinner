import { prisma } from "./prisma-client";
import { ingredients, categories, products } from "./constants";

const createVariant = ({
  productId,
  size,
  pizzaType,
}: {
  productId: number;
  size?: number;
  pizzaType?: number;
}) => ({
  productId,
  size,
  pizzaType,
  price: Math.ceil(Math.random() * 90 + 10) * 10,
});

async function create() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "Barbara",
        email: "barbaraggg@gail.com",
        password: "asdfgh",
        role: "ADMIN",
      },
      {
        fullName: "Melman",
        email: "melman@gail.com",
        password: "12345",
        role: "USER",
      },
    ],
  });
  await prisma.ingredient.createMany({
    data: ingredients,
  });
  await prisma.category.createMany({
    data: categories,
  });
  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imgUrl: "/pizza1.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imgUrl: "/pizza2.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш ",
      imgUrl: "/pizza3.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 30),
      },
    },
  });

  await prisma.variation.createMany({
    data: [
      createVariant({ pizzaType: 1, size: 30, productId: pizza1.id }),
      createVariant({ pizzaType: 1, size: 40, productId: pizza1.id }),
      createVariant({ pizzaType: 2, size: 50, productId: pizza1.id }),
      createVariant({ pizzaType: 1, size: 50, productId: pizza1.id }),

      createVariant({ pizzaType: 2, size: 30, productId: pizza2.id }),
      createVariant({ pizzaType: 1, size: 40, productId: pizza2.id }),
      createVariant({ pizzaType: 1, size: 50, productId: pizza2.id }),

      createVariant({ pizzaType: 2, size: 30, productId: pizza3.id }),
      createVariant({ pizzaType: 1, size: 40, productId: pizza3.id }),
      createVariant({ pizzaType: 2, size: 50, productId: pizza3.id }),
      createVariant({ pizzaType: 2, size: 40, productId: pizza3.id }),

      createVariant({ productId: 1 }),
      createVariant({ productId: 2 }),
      createVariant({ productId: 3 }),
      createVariant({ productId: 4 }),
      createVariant({ productId: 5 }),
      createVariant({ productId: 6 }),
      createVariant({ productId: 7 }),
      createVariant({ productId: 8 }),
      createVariant({ productId: 9 }),
      createVariant({ productId: 10 }),
      createVariant({ productId: 11 }),
      createVariant({ productId: 12 }),
      createVariant({ productId: 13 }),
      createVariant({ productId: 14 }),
      createVariant({ productId: 15 }),
      createVariant({ productId: 16 }),
      createVariant({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        token: "12345",
        userId: 1,
        totalAmount: 550,
      },
      {
        token: "54321",
        userId: 2,
        totalAmount: 1050,
      },
    ],
  });

  await prisma.cartProduct.create({
    data: {
      quantity: 2,
      cartId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
      variantId: 1,
    },
  });
}

async function reset() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Variation" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartProduct" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await reset();
    await create();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
