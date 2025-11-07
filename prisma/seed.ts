import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@atomic.com' },
    update: {},
    create: {
      email: 'admin@atomic.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✓ Admin user created:', admin.email);

  // Create contributors
  const drMoore = await prisma.contributor.create({
    data: {
      name: 'Dr. Sarah Moore',
      email: 'sarah.moore@oceanlab.edu',
      role: 'Marine Biologist',
      bio: 'Marine biologist specializing in microscopic marine organisms. Based at Long Island Marine Lab.',
      website: 'https://oceanlab.edu/moore',
      socials: { instagram: '@drsarahmoore', twitter: '@sarahmoore_sci' },
      revShareBps: 500, // 5%
      verified: true,
    },
  });

  const labTech = await prisma.contributor.create({
    data: {
      name: 'North Shore University SEM Lab',
      email: 'semlab@nsu.edu',
      role: 'Research Lab',
      bio: 'State-of-the-art scanning electron microscopy facility on Long Island.',
      website: 'https://nsu.edu/semlab',
      revShareBps: 300,
      verified: true,
    },
  });

  const geologistJames = await prisma.contributor.create({
    data: {
      name: 'James Chen',
      email: 'james@geologyshots.com',
      role: 'Geologist & Photographer',
      bio: 'Capturing the hidden beauty of minerals through polarized light microscopy.',
      website: 'https://geologyshots.com',
      socials: { instagram: '@geologyshots' },
      revShareBps: 500,
      verified: true,
    },
  });

  console.log('✓ Contributors created');

  // Create impact routes
  const schoolLabs = await prisma.impactRoute.create({
    data: {
      slug: 'north-babylon-labs',
      name: 'North Babylon School Labs',
      type: 'Education',
      description:
        'Funding microscopes, lab equipment, and STEM materials for North Babylon High School.',
      splitBps: 1500, // 15%
      location: 'Long Island, NY',
      active: true,
    },
  });

  const beachRestoration = await prisma.impactRoute.create({
    data: {
      slug: 'li-beach-restoration',
      name: 'Long Island Beach Restoration',
      type: 'Restoration',
      description: 'Supporting coastal cleanup and habitat restoration along Long Island shores.',
      splitBps: 1000, // 10%
      location: 'Long Island, NY',
      publicUrl: 'https://libeachrestoration.org',
      active: true,
    },
  });

  const youthProgram = await prisma.impactRoute.create({
    data: {
      slug: 'stem-youth-program',
      name: 'STEM Youth Summer Program',
      type: 'Youth Program',
      description: 'Free summer science camps for underserved youth on Long Island.',
      splitBps: 2000, // 20%
      location: 'Long Island, NY',
      active: true,
    },
  });

  console.log('✓ Impact routes created');

  // Create collections
  const microscope = await prisma.collection.create({
    data: {
      slug: 'microscope',
      title: 'Microscope',
      blurb: 'SEM and optical microscopy revealing hidden worlds',
      description:
        'Journey into the invisible with scanning electron microscopy and high-powered optical imaging. Each piece captures structures measured in microns.',
      published: true,
      sortOrder: 1,
    },
  });

  const geology = await prisma.collection.create({
    data: {
      slug: 'geology',
      title: 'Geology',
      blurb: 'Minerals and rocks in stunning detail',
      description:
        "Earth's treasures magnified: crystals, minerals, and geological formations captured through polarized light and macro photography.",
      published: true,
      sortOrder: 2,
    },
  });

  const bioPatterns = await prisma.collection.create({
    data: {
      slug: 'biopatterns',
      title: 'BioPatterns',
      blurb: 'Nature\'s microscopic blueprints',
      description:
        'Insects, shells, leaves, and biological structures showcasing the mathematical beauty of evolution.',
      published: true,
      sortOrder: 3,
    },
  });

  const marineLI = await prisma.collection.create({
    data: {
      slug: 'marine-long-island',
      title: 'Marine Long Island',
      blurb: 'Coastal treasures from our shores',
      description:
        'Microscopic and macro views of marine life from Long Island waters - seaweed, shells, and coastal organisms.',
      published: true,
      sortOrder: 4,
    },
  });

  const astral = await prisma.collection.create({
    data: {
      slug: 'astral',
      title: 'Astral',
      blurb: 'Meteorites and cosmic matter',
      description:
        'Materials from beyond Earth: meteorite cross-sections and space-sourced imagery.',
      published: true,
      sortOrder: 5,
    },
  });

  console.log('✓ Collections created');

  // Create specimens and products
  const saltSpecimen = await prisma.specimen.create({
    data: {
      code: 'SPEC-MICRO-NACL-001',
      title: 'Table Salt Crystal',
      category: 'Microscope',
      technique: 'Polarized Light Microscopy',
      magnification: '1000x',
      sourceNote: 'Common table salt (sodium chloride) crystallized and imaged under crossed polars',
      location: 'Lab cultured',
      contributorId: labTech.id,
      assetUrl: '/art/original/salt-crystal-1000x.jpg',
      thumbnailUrl: '/art/thumbs/salt-crystal-1000x.jpg',
      taxonomy: {
        compound: 'Sodium Chloride',
        formula: 'NaCl',
        crystalSystem: 'Cubic',
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: 'salt-crystal-tee',
      title: 'Salt Crystal T-Shirt',
      sku: 'ATOM-SALT-001',
      description:
        "You've seen salt a million times, but never like this. At 1000x magnification, table salt reveals perfect cubic crystals in stunning geometric patterns. This is sodium chloride (NaCl) captured under polarized light microscopy.",
      fieldNote:
        'Salt crystals form perfect cubes due to their ionic bond structure. Each sodium ion is surrounded by six chloride ions, creating the characteristic cubic lattice. This image was captured using crossed polarizers, which reveal the crystal structure through birefringence.',
      priceCents: 4500,
      specimenId: saltSpecimen.id,
      collectionId: microscope.id,
      impactRouteId: schoolLabs.id,
      published: true,
      featured: true,
      tags: ['microscopy', 'crystals', 'chemistry', 'bestseller'],
      seoTitle: 'Salt Crystal Microscopy T-Shirt - ATOMIC Clothing',
      seoDescription:
        'Wear science: Table salt magnified 1000x. Premium organic cotton tee featuring real microscope imagery. Funds STEM education.',
      images: {
        create: [
          {
            url: '/products/salt-crystal-front.jpg',
            alt: 'Salt crystal microscopy t-shirt front',
            sortOrder: 1,
            width: 1200,
            height: 1600,
          },
          {
            url: '/products/salt-crystal-detail.jpg',
            alt: 'Salt crystal detail close-up',
            sortOrder: 2,
            width: 1200,
            height: 1200,
          },
        ],
      },
      variants: {
        create: [
          {
            size: 'S',
            color: 'Navy',
            material: 'Organic Cotton',
            stockQty: 25,
            printProviderSku: 'bella-3001-navy-s',
            printProviderType: 'printful',
            weightGrams: 145,
          },
          {
            size: 'M',
            color: 'Navy',
            material: 'Organic Cotton',
            stockQty: 50,
            printProviderSku: 'bella-3001-navy-m',
            printProviderType: 'printful',
            weightGrams: 150,
          },
          {
            size: 'L',
            color: 'Navy',
            material: 'Organic Cotton',
            stockQty: 50,
            printProviderSku: 'bella-3001-navy-l',
            printProviderType: 'printful',
            weightGrams: 155,
          },
          {
            size: 'XL',
            color: 'Navy',
            material: 'Organic Cotton',
            stockQty: 30,
            printProviderSku: 'bella-3001-navy-xl',
            printProviderType: 'printful',
            weightGrams: 160,
          },
        ],
      },
    },
  });

  const butterflySpecimen = await prisma.specimen.create({
    data: {
      code: 'SPEC-BIO-MORPHO-001',
      title: 'Morpho Butterfly Wing Scales',
      category: 'BioPatterns',
      technique: 'Scanning Electron Microscopy (SEM)',
      magnification: '500x',
      sourceNote:
        'Morpho butterfly wing scales showing the microscopic structures that create structural blue coloration',
      location: 'Costa Rica specimen, imaged Long Island',
      contributorId: drMoore.id,
      assetUrl: '/art/original/morpho-wing-500x.jpg',
      thumbnailUrl: '/art/thumbs/morpho-wing-500x.jpg',
      taxonomy: {
        kingdom: 'Animalia',
        phylum: 'Arthropoda',
        class: 'Insecta',
        order: 'Lepidoptera',
        family: 'Nymphalidae',
        genus: 'Morpho',
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: 'morpho-butterfly-tee',
      title: 'Morpho Butterfly Wing T-Shirt',
      sku: 'ATOM-MORPHO-001',
      description:
        "The Morpho butterfly's brilliant blue isn't from pigment—it's nanoengineering. At 500x magnification under SEM, we see the microscopic tree-like scales that bend light to create one of nature's most stunning colors.",
      fieldNote:
        'Morpho butterflies achieve their iconic blue through structural coloration, not pigments. Microscopic ridges on wing scales are precisely spaced to reflect blue wavelengths through interference. This is biomimicry millions of years in the making.',
      priceCents: 4500,
      specimenId: butterflySpecimen.id,
      collectionId: bioPatterns.id,
      impactRouteId: youthProgram.id,
      published: true,
      featured: true,
      tags: ['SEM', 'insects', 'biomimicry', 'bestseller'],
      images: {
        create: [
          {
            url: '/products/morpho-front.jpg',
            alt: 'Morpho butterfly wing SEM t-shirt',
            sortOrder: 1,
          },
        ],
      },
      variants: {
        create: [
          { size: 'S', color: 'Charcoal', material: 'Organic Cotton', stockQty: 20 },
          { size: 'M', color: 'Charcoal', material: 'Organic Cotton', stockQty: 40 },
          { size: 'L', color: 'Charcoal', material: 'Organic Cotton', stockQty: 40 },
          { size: 'XL', color: 'Charcoal', material: 'Organic Cotton', stockQty: 25 },
        ],
      },
    },
  });

  // Quartz
  const quartzSpecimen = await prisma.specimen.create({
    data: {
      code: 'SPEC-GEO-QUARTZ-001',
      title: 'Quartz Crystal Formation',
      category: 'Geology',
      technique: 'Polarized Light Microscopy',
      magnification: '200x',
      sourceNote: 'Quartz thin section showing hexagonal crystal structure',
      location: 'Arkansas, USA',
      contributorId: geologistJames.id,
      assetUrl: '/art/original/quartz-200x.jpg',
      thumbnailUrl: '/art/thumbs/quartz-200x.jpg',
      taxonomy: {
        mineral: 'Quartz',
        formula: 'SiO2',
        crystalSystem: 'Hexagonal',
        hardness: '7',
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: 'quartz-crystal-tee',
      title: 'Quartz Crystal T-Shirt',
      sku: 'ATOM-QUARTZ-001',
      description:
        'Silicon dioxide—quartz—is one of Earth's most abundant minerals. Under polarized light at 200x, its hexagonal structure creates a kaleidoscope of interference colors. This is geology as abstract art.',
      fieldNote:
        'Quartz crystals form hexagonal prisms due to the arrangement of silicon and oxygen atoms. This specimen was cut into a thin section and imaged between crossed polarizers, revealing its optical properties through brilliant colors.',
      priceCents: 4500,
      specimenId: quartzSpecimen.id,
      collectionId: geology.id,
      impactRouteId: schoolLabs.id,
      published: true,
      tags: ['geology', 'minerals', 'crystals'],
      images: {
        create: [{ url: '/products/quartz-front.jpg', alt: 'Quartz crystal t-shirt', sortOrder: 1 }],
      },
      variants: {
        create: [
          { size: 'S', color: 'Off White', material: 'Organic Cotton', stockQty: 15 },
          { size: 'M', color: 'Off White', material: 'Organic Cotton', stockQty: 30 },
          { size: 'L', color: 'Off White', material: 'Organic Cotton', stockQty: 30 },
          { size: 'XL', color: 'Off White', material: 'Organic Cotton', stockQty: 20 },
        ],
      },
    },
  });

  // Diatom (Marine LI)
  const diatomSpecimen = await prisma.specimen.create({
    data: {
      code: 'SPEC-MAR-DIATOM-001',
      title: 'Diatom Colony - Long Island Sound',
      category: 'Marine',
      technique: 'Brightfield Microscopy',
      magnification: '400x',
      sourceNote:
        'Diatoms collected from Long Island Sound, showing intricate silica cell walls (frustules)',
      location: 'Long Island Sound, NY',
      contributorId: drMoore.id,
      assetUrl: '/art/original/diatom-400x.jpg',
      thumbnailUrl: '/art/thumbs/diatom-400x.jpg',
      taxonomy: {
        kingdom: 'Protista',
        phylum: 'Bacillariophyta',
        class: 'Bacillariophyceae',
        note: 'Mixed species colony',
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: 'li-diatom-tee',
      title: 'Long Island Diatom T-Shirt',
      sku: 'ATOM-DIATOM-001',
      description:
        'From the waters off Long Island: diatoms. These single-celled algae build ornate glass houses—silica frustules—in patterns more intricate than any human design. Photographed at 400x from a Long Island Sound water sample.',
      fieldNote:
        'Diatoms are responsible for 20% of Earth's oxygen production. Each species creates a unique silica shell with mathematical precision. This mixed colony was collected near Port Jefferson and reveals the hidden diversity in just one drop of seawater.',
      priceCents: 4800,
      specimenId: diatomSpecimen.id,
      collectionId: marineLI.id,
      impactRouteId: beachRestoration.id,
      published: true,
      featured: true,
      tags: ['marine', 'long island', 'microscopy', 'local'],
      images: {
        create: [{ url: '/products/diatom-front.jpg', alt: 'Diatom colony t-shirt', sortOrder: 1 }],
      },
      variants: {
        create: [
          { size: 'S', color: 'Ocean Blue', material: 'Recycled Poly Blend', stockQty: 20 },
          { size: 'M', color: 'Ocean Blue', material: 'Recycled Poly Blend', stockQty: 35 },
          { size: 'L', color: 'Ocean Blue', material: 'Recycled Poly Blend', stockQty: 35 },
          { size: 'XL', color: 'Ocean Blue', material: 'Recycled Poly Blend', stockQty: 25 },
        ],
      },
    },
  });

  // Meteorite
  const meteoriteSpecimen = await prisma.specimen.create({
    data: {
      code: 'SPEC-AST-METEOR-001',
      title: 'Iron Meteorite - Widmanstätten Pattern',
      category: 'Astral',
      technique: 'Macro Photography + Acid Etch',
      magnification: '10x',
      sourceNote:
        'Etched cross-section of an iron meteorite showing Widmanstätten patterns—only formed in space over millions of years of slow cooling',
      location: 'Campo del Cielo, Argentina',
      contributorId: geologistJames.id,
      assetUrl: '/art/original/meteorite-10x.jpg',
      thumbnailUrl: '/art/thumbs/meteorite-10x.jpg',
      taxonomy: {
        type: 'Iron Meteorite (Octahedrite)',
        classification: 'IAB',
        age: '~4.5 billion years',
        composition: 'Iron-Nickel alloy',
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: 'meteorite-widmanstatten-tee',
      title: 'Meteorite Widmanstätten T-Shirt',
      sku: 'ATOM-METEOR-001',
      description:
        'This pattern can only form in space. Widmanstätten structures in iron meteorites result from cooling over millions of years in zero-gravity. When etched with acid, these extraterrestrial crystals reveal geometric patterns impossible to replicate on Earth.',
      fieldNote:
        'Widmanstätten patterns form when iron-nickel meteorites cool at rates of 1-100°C per million years in space. The resulting kamacite and taenite crystal intergrowth creates these distinctive patterns, proving the extraterrestrial origin of the material.',
      priceCents: 5500,
      specimenId: meteoriteSpecimen.id,
      collectionId: astral.id,
      impactRouteId: youthProgram.id,
      published: true,
      featured: true,
      tags: ['meteorite', 'space', 'geology', 'premium'],
      images: {
        create: [{ url: '/products/meteorite-front.jpg', alt: 'Meteorite pattern t-shirt', sortOrder: 1 }],
      },
      variants: {
        create: [
          { size: 'S', color: 'Black', material: 'Premium Cotton', stockQty: 15 },
          { size: 'M', color: 'Black', material: 'Premium Cotton', stockQty: 25 },
          { size: 'L', color: 'Black', material: 'Premium Cotton', stockQty: 25 },
          { size: 'XL', color: 'Black', material: 'Premium Cotton', stockQty: 20 },
          { size: 'XXL', color: 'Black', material: 'Premium Cotton', stockQty: 10 },
        ],
      },
    },
  });

  // Snowflake
  const snowflakeSpecimen = await prisma.specimen.create({
    data: {
      code: 'SPEC-MICRO-SNOW-001',
      title: 'Snowflake Crystal',
      category: 'Microscope',
      technique: 'Cold-stage Microscopy',
      magnification: '100x',
      sourceNote: 'Fresh snowflake captured and photographed before melting',
      location: 'Long Island, NY - Winter 2024',
      contributorId: labTech.id,
      assetUrl: '/art/original/snowflake-100x.jpg',
      thumbnailUrl: '/art/thumbs/snowflake-100x.jpg',
      taxonomy: {
        compound: 'Ice (H2O)',
        crystalSystem: 'Hexagonal',
        formationType: 'Stellar dendrite',
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: 'snowflake-crystal-tee',
      title: 'Snowflake Crystal T-Shirt',
      sku: 'ATOM-SNOW-001',
      description:
        "Every snowflake is unique, but all follow hexagonal geometry. This specimen was captured during a Long Island snowstorm and photographed at 100x before melting. Water's crystal structure creates infinite variation within mathematical rules.",
      fieldNote:
        'Snowflakes form hexagonal shapes because of water molecule geometry. As ice crystals grow, temperature and humidity determine branch patterns. This stellar dendrite formed at around -15°C with high humidity, creating the classic six-pointed star.',
      priceCents: 4500,
      specimenId: snowflakeSpecimen.id,
      collectionId: microscope.id,
      impactRouteId: schoolLabs.id,
      published: true,
      tags: ['microscopy', 'crystals', 'local', 'seasonal'],
      images: {
        create: [{ url: '/products/snowflake-front.jpg', alt: 'Snowflake crystal t-shirt', sortOrder: 1 }],
      },
      variants: {
        create: [
          { size: 'S', color: 'Ice Blue', material: 'Organic Cotton', stockQty: 20 },
          { size: 'M', color: 'Ice Blue', material: 'Organic Cotton', stockQty: 40 },
          { size: 'L', color: 'Ice Blue', material: 'Organic Cotton', stockQty: 40 },
          { size: 'XL', color: 'Ice Blue', material: 'Organic Cotton', stockQty: 25 },
        ],
      },
    },
  });

  // Pollen
  const pollenSpecimen = await prisma.specimen.create({
    data: {
      code: 'SPEC-BIO-POLLEN-001',
      title: 'Oak Pollen Grains',
      category: 'BioPatterns',
      technique: 'Scanning Electron Microscopy (SEM)',
      magnification: '2000x',
      sourceNote: 'Long Island oak pollen showing intricate surface patterns and pores',
      location: 'Long Island, NY',
      contributorId: labTech.id,
      assetUrl: '/art/original/pollen-2000x.jpg',
      thumbnailUrl: '/art/thumbs/pollen-2000x.jpg',
      taxonomy: {
        kingdom: 'Plantae',
        family: 'Fagaceae',
        genus: 'Quercus',
        structure: 'Pollen grain',
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: 'oak-pollen-tee',
      title: 'Oak Pollen Grain T-Shirt',
      sku: 'ATOM-POLLEN-001',
      description:
        'What causes spring allergies? At 2000x magnification under SEM, oak pollen reveals itself: textured spheres covered in strategic pores for germination. Beautiful, even if they make you sneeze.',
      fieldNote:
        'Pollen grains are built for survival. Their outer wall (exine) is one of nature's most durable materials, designed to protect DNA during transport. The surface patterns and pores are species-specific—botanists can identify plants from pollen alone.',
      priceCents: 4500,
      specimenId: pollenSpecimen.id,
      collectionId: bioPatterns.id,
      impactRouteId: schoolLabs.id,
      published: true,
      tags: ['SEM', 'plants', 'local', 'seasonal'],
      images: {
        create: [{ url: '/products/pollen-front.jpg', alt: 'Oak pollen grain t-shirt', sortOrder: 1 }],
      },
      variants: {
        create: [
          { size: 'S', color: 'Sage Green', material: 'Organic Cotton', stockQty: 15 },
          { size: 'M', color: 'Sage Green', material: 'Organic Cotton', stockQty: 30 },
          { size: 'L', color: 'Sage Green', material: 'Organic Cotton', stockQty: 30 },
          { size: 'XL', color: 'Sage Green', material: 'Organic Cotton', stockQty: 20 },
        ],
      },
    },
  });

  // Oyster Shell
  const oysterSpecimen = await prisma.specimen.create({
    data: {
      code: 'SPEC-MAR-OYSTER-001',
      title: 'Oyster Shell Nacre (Mother of Pearl)',
      category: 'Marine',
      technique: 'Polarized Light Microscopy',
      magnification: '300x',
      sourceNote:
        'Cross-section of oyster shell from Long Island waters, showing nacreous layers that create iridescence',
      location: 'Great South Bay, Long Island, NY',
      contributorId: drMoore.id,
      assetUrl: '/art/original/oyster-nacre-300x.jpg',
      thumbnailUrl: '/art/thumbs/oyster-nacre-300x.jpg',
      taxonomy: {
        kingdom: 'Animalia',
        phylum: 'Mollusca',
        class: 'Bivalvia',
        family: 'Ostreidae',
        structure: 'Nacre (aragonite + conchiolin)',
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: 'oyster-nacre-tee',
      title: 'Oyster Nacre T-Shirt',
      sku: 'ATOM-OYSTER-001',
      description:
        "Mother of pearl isn't just beautiful—it's bioengineering. Oyster shells layer aragonite crystals with protein to create nacre: 3000x stronger than the minerals alone. This specimen came from Great South Bay, Long Island.",
      fieldNote:
        'Nacre is a composite material: 95% aragonite (calcium carbonate) and 5% organic matter. Oysters deposit it in precise hexagonal layers, creating a structure that dissipates impacts and reflects light into iridescent colors. The same principles inspire modern armor and composites.',
      priceCents: 4800,
      specimenId: oysterSpecimen.id,
      collectionId: marineLI.id,
      impactRouteId: beachRestoration.id,
      published: true,
      featured: true,
      tags: ['marine', 'long island', 'biomaterials', 'local'],
      images: {
        create: [{ url: '/products/oyster-front.jpg', alt: 'Oyster nacre t-shirt', sortOrder: 1 }],
      },
      variants: {
        create: [
          { size: 'S', color: 'Pearl White', material: 'Organic Cotton', stockQty: 20 },
          { size: 'M', color: 'Pearl White', material: 'Organic Cotton', stockQty: 35 },
          { size: 'L', color: 'Pearl White', material: 'Organic Cotton', stockQty: 35 },
          { size: 'XL', color: 'Pearl White', material: 'Organic Cotton', stockQty: 25 },
        ],
      },
    },
  });

  // Basalt Thin Section
  const basaltSpecimen = await prisma.specimen.create({
    data: {
      code: 'SPEC-GEO-BASALT-001',
      title: 'Basalt Thin Section - Volcanic Rock',
      category: 'Geology',
      technique: 'Polarized Light Microscopy (Cross-polars)',
      magnification: '40x',
      sourceNote: 'Thin section of basaltic lava showing olivine, pyroxene, and plagioclase crystals',
      location: 'Hawaii (volcanic origin)',
      contributorId: geologistJames.id,
      assetUrl: '/art/original/basalt-40x.jpg',
      thumbnailUrl: '/art/thumbs/basalt-40x.jpg',
      taxonomy: {
        rockType: 'Igneous (volcanic)',
        composition: 'Basalt',
        minerals: 'Olivine, Pyroxene, Plagioclase',
        texture: 'Porphyritic',
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: 'basalt-volcanic-tee',
      title: 'Volcanic Basalt T-Shirt',
      sku: 'ATOM-BASALT-001',
      description:
        'Frozen lava. This basalt thin section captures the moment volcanic rock cooled. Under polarized light, olivine crystals glow green, pyroxene appears multicolored, and plagioclase shows twinning patterns. Geology becomes a stained glass window.',
      fieldNote:
        'Basalt forms when lava cools quickly at Earth's surface. This specimen shows porphyritic texture: large crystals (phenocrysts) that grew slowly in the magma chamber, suspended in a fine-grained matrix that cooled rapidly during eruption. Crossed polarizers reveal each mineral's optical signature.',
      priceCents: 4500,
      specimenId: basaltSpecimen.id,
      collectionId: geology.id,
      impactRouteId: schoolLabs.id,
      published: true,
      tags: ['geology', 'volcanic', 'minerals', 'colorful'],
      images: {
        create: [{ url: '/products/basalt-front.jpg', alt: 'Basalt thin section t-shirt', sortOrder: 1 }],
      },
      variants: {
        create: [
          { size: 'S', color: 'Charcoal', material: 'Organic Cotton', stockQty: 15 },
          { size: 'M', color: 'Charcoal', material: 'Organic Cotton', stockQty: 30 },
          { size: 'L', color: 'Charcoal', material: 'Organic Cotton', stockQty: 30 },
          { size: 'XL', color: 'Charcoal', material: 'Organic Cotton', stockQty: 20 },
        ],
      },
    },
  });

  // Mosquito Eye
  const mosquitoSpecimen = await prisma.specimen.create({
    data: {
      code: 'SPEC-BIO-MOSQUITO-001',
      title: 'Mosquito Compound Eye',
      category: 'BioPatterns',
      technique: 'Scanning Electron Microscopy (SEM)',
      magnification: '800x',
      sourceNote: 'Close-up of mosquito compound eye showing hexagonal ommatidia array',
      location: 'Long Island, NY',
      contributorId: labTech.id,
      assetUrl: '/art/original/mosquito-eye-800x.jpg',
      thumbnailUrl: '/art/thumbs/mosquito-eye-800x.jpg',
      taxonomy: {
        kingdom: 'Animalia',
        phylum: 'Arthropoda',
        class: 'Insecta',
        order: 'Diptera',
        family: 'Culicidae',
        structure: 'Compound eye (ommatidia)',
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: 'mosquito-eye-tee',
      title: 'Mosquito Compound Eye T-Shirt',
      sku: 'ATOM-MOSQUITO-001',
      description:
        'You've swatted them. Now see them. A mosquito's compound eye is an array of hundreds of hexagonal lenses (ommatidia), each capturing a pixel of the world. At 800x under SEM, it looks like alien technology—but it's just nature.',
      fieldNote:
        'Compound eyes provide wide-angle vision with motion detection optimized by millions of years of evolution. Each ommatidium contains photoreceptors, lens, and pigment cells. The hexagonal packing is mathematically optimal—the same reason honeybees build hexagonal cells.',
      priceCents: 4500,
      specimenId: mosquitoSpecimen.id,
      collectionId: bioPatterns.id,
      impactRouteId: youthProgram.id,
      published: true,
      tags: ['SEM', 'insects', 'patterns', 'local'],
      images: {
        create: [{ url: '/products/mosquito-front.jpg', alt: 'Mosquito eye SEM t-shirt', sortOrder: 1 }],
      },
      variants: {
        create: [
          { size: 'S', color: 'Navy', material: 'Organic Cotton', stockQty: 20 },
          { size: 'M', color: 'Navy', material: 'Organic Cotton', stockQty: 35 },
          { size: 'L', color: 'Navy', material: 'Organic Cotton', stockQty: 35 },
          { size: 'XL', color: 'Navy', material: 'Organic Cotton', stockQty: 25 },
        ],
      },
    },
  });

  console.log('✓ 10 Products created with specimens');

  // Create a limited edition drop
  const springDrop = await prisma.drop.create({
    data: {
      slug: 'spring-2025-bloom',
      title: 'Spring 2025: Bloom',
      description:
        'Limited edition collection celebrating microscopic spring phenomena: pollen, new growth, and marine blooms. 50 numbered pieces per design.',
      startAt: new Date('2025-03-20T00:00:00Z'),
      endAt: new Date('2025-04-20T23:59:59Z'),
      limited: true,
      editionSize: 50,
      published: true,
    },
  });

  console.log('✓ Drop created');

  // Create discount codes
  await prisma.discountCode.create({
    data: {
      code: 'STUDENT25',
      type: 'percentage',
      value: 25,
      active: true,
    },
  });

  await prisma.discountCode.create({
    data: {
      code: 'RESEARCHER30',
      type: 'percentage',
      value: 30,
      active: true,
    },
  });

  await prisma.discountCode.create({
    data: {
      code: 'SCIENCESUPPORTER20',
      type: 'percentage',
      value: 20,
      active: true,
    },
  });

  console.log('✓ Discount codes created');

  console.log('\n✅ Seed complete!\n');
  console.log('Admin login:');
  console.log('  Email: admin@atomic.com');
  console.log('  Password: admin123\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
