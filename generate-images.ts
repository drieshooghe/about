#!/usr/bin/env -S pnpm tsx

import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

// Define the structure of the configuration object
interface ImageConfig {
  inputPath: string;       // Path to the input image within the assets directory
  sizes: number[];         // Array of sizes to generate
  densities: number[];     // Array of pixel densities to generate (e.g., [1, 2] for 1x, 2x)
  formats: OutputFormat[]; // Array of output formats (e.g., ['jpeg', 'webp'])
  placeholder: boolean;    // Generate a blurred placeholder image
}

type OutputFormat = 'jpeg' | 'png' | 'webp' | 'avif';

// Function to remove existing images in the output directory
async function clearDirectory(directoryPath: string): Promise<void> {
  try {
    const files = await fs.readdir(directoryPath);
    
    // Iterate over each file and subdirectory
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        // If it's a directory, recursively clear it
        await clearDirectory(filePath);
        // Remove the now-empty directory
        await fs.rmdir(filePath);
        console.log(`Removed directory: ${filePath}`);
      } else {
        // If it's a file, delete it
        await fs.unlink(filePath);
        console.log(`Removed file: ${filePath}`);
      }
    }
  } catch (err) {
    console.error('Error clearing directory:', err);
  }
}

// Define the function to process the images
async function generateImages(configs: ImageConfig[], outputPath: string) {
  // Remove existing images first
  await clearDirectory(outputPath);

  // Then generate new images
  for (const config of configs) {
    const { inputPath, sizes, densities, formats, placeholder } = config;
    const absoluteInputPath = path.resolve(__dirname, 'src/assets', inputPath);

    if(placeholder) {
      for (const format of formats) {
        const image = sharp(absoluteInputPath)
        .resize(20)  // Resize the image based on size and density
        .toFormat(format);

        const outputFileName = `${path.basename(inputPath, path.extname(inputPath))}-@1x.${format}`;
        const outputFilePath = path.join(outputPath, outputFileName);

        await image.toFile(outputFilePath);
        console.log(`Generated ${outputFilePath}`);
      }
    }

    for (const size of sizes) {
      for (const density of densities) {
        for (const format of formats) {
          const image = sharp(absoluteInputPath)
            .resize(Math.round(size * density))  // Resize the image based on size and density
            .toFormat(format);

          const outputFileName = `${path.basename(inputPath, path.extname(inputPath))}-${size}@${density}x.${format}`;
          const outputFilePath = path.join(outputPath, outputFileName);

          await image.toFile(outputFilePath);
          console.log(`Generated ${outputFilePath}`);
        }
      }
    }
  }
}

// Example usage
// Example usage
const imageConfigs: ImageConfig[] = [
	{
	  inputPath: 'avatar.png',
	  sizes: [162, 224],    // Generate 162px and 224px width images
	  densities: [1, 2],    // Generate @1x and @2x images
	  formats: ['webp', 'avif', 'png'], // Output as JPEG and WebP
    placeholder: true,
	}
  ];

const outputPath = path.resolve(__dirname, 'public/image');

generateImages(imageConfigs, outputPath)
  .then(() => console.log('All images have been generated!'))
  .catch(err => console.error('Error generating images:', err));
