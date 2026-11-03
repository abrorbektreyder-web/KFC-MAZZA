import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with INITIAL_PRODUCTS...");

  const products = [
    {
      slug: "sweet-crispy-chicken",
      nameUz: "Shirin Qarsildoq Tovuq",
      nameRu: "Сладкая хрустящая курочка",
      description: "Maxsus nozik asal-shirin marinad, qarsildoq oltin non talqoni va ichi suvli tovuq go'shti. Butun oila va bolalar uchun a'lo tanlov.",
      basePricePerKg: 80000,
      isSpicy: false,
      isAvailable: true,
      imageUrl: "/images/products/sweet-crispy.jpg",
      badgeText: "Eng Ko'p Sotilgan",
      sortOrder: 1,
    },
    {
      slug: "spicy-crispy-chicken",
      nameUz: "Achchiq Qarsildoq Tovuq",
      nameRu: "Острая хрустящая курочка",
      description: "Haqiqiy olovli achchiq qalampir va tabiiy ziravorlar marinadi. Qarsildoq qobiq va kuchli ishtahaochar achchiq ta'm muxlislari uchun.",
      basePricePerKg: 80000,
      isSpicy: true,
      isAvailable: true,
      imageUrl: "/images/products/spicy-crispy.jpg",
      badgeText: "Olovli Ta'm 🔥",
      sortOrder: 2,
    },
    {
      slug: "hot-fryer-basket",
      nameUz: "Mega Qarsildoq Savat",
      nameRu: "Мега корзина хрустящей курочки",
      description: "Qaynoq friturnitsadan yangi olingan issiq qarsildoq qanotchalar va boldirlar to'plami. Do'stlar davrasi va yig'inlar uchun maxsus to'plam.",
      basePricePerKg: 85000,
      isSpicy: false,
      isAvailable: true,
      imageUrl: "/images/products/hot-basket.jpg",
      badgeText: "Katta Davralar",
      sortOrder: 3,
    },
    {
      slug: "sauce-combo-platter",
      nameUz: "Qarsildoq Jamlanma & 3 Xil Sous",
      nameRu: "Хрустящий сет с 3 соусами",
      description: "Qarsildoq tovuqlar va 3 xil firma sousi: Qalin Barbekyu, Olovli Qalampir va Mayin Sarimsoqli Oq sous.",
      basePricePerKg: 85000,
      isSpicy: false,
      isAvailable: true,
      imageUrl: "/images/products/sauce-platter.jpg",
      badgeText: "Souslar Jamlanmasi",
      sortOrder: 4,
    },
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }

  // Create default business setting
  await prisma.businessSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      restaurantName: "ANDIJON MAZZA",
      contactPhone: "+998901234567",
      telegramUsername: "@andijon_mazza_bot",
      isOpen: true,
      openTime: "10:00",
      closeTime: "23:00",
      pickupAddressUz: "Andijon tumani, Markaziy ko'cha 15-uy",
    },
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
