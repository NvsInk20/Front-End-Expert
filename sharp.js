const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const sourceDirectory = path.resolve(__dirname, 'src/public/images/heros');
const destinationDirectory = path.resolve(__dirname, 'src/public/images/heros_resized');

if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory);
}

const resizeAndSaveImage = async (imagePath, size, suffix) => {
    const imageBuffer = await sharp(imagePath).resize(size).toBuffer();
    const imageName = path.basename(imagePath, path.extname(imagePath));
    const newImagePath = path.join(destinationDirectory, `${imageName}-${suffix}.jpg`);
    fs.writeFileSync(newImagePath, imageBuffer);
};

fs.readdirSync(sourceDirectory).forEach(async (image) => {
    const imagePath = path.join(sourceDirectory, image);
    await resizeAndSaveImage(imagePath, 800, 'large');
    await resizeAndSaveImage(imagePath, 480, 'small');
    await resizeAndSaveImage(imagePath, 1350, 'max');
});
