"use server";
import prisma from "@/database";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";

// Define image detection function
export async function imageDetection(imageUrl: string) {
  const computerVisionKey = process.env.AZURE_VISION_KEY || "5dbe8d441f284f9ca774019b21a36e3e";
  const computerVisionEndPoint =
    process.env.AZURE_VISION_ENDPOINT || "https://smartparkingvision.cognitiveservices.azure.com/";

  // Create the credentials for Azure Cognitive Service
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(computerVisionKey);
  const client = new ComputerVisionClient(cognitiveServiceCredentials, computerVisionEndPoint);

  // const imageUrl = "https://5.imimg.com/data5/ZW/ZB/SM/SELLER-4005118/acrylic-vehicle-number-plate-500x500.png";
  // const imageUrl =
  //   "https://rukminim2.flixcart.com/image/850/1000/kw3v0cw0/vehicle-number-plate/a/p/u/6-number-plate-frame-for-all-cars-golden-fox-1-original-imag8uzaqtyxnnzz.jpeg?q=90&crop=false";

  console.log("Analyzing the image...");

  try {
    // Call the Read API to extract text from image
    const readResponse = await client.read(imageUrl);

    // Retrieve operation ID from the response
    const operationLocation = readResponse.operationLocation;
    const operationId = operationLocation?.substring(operationLocation.lastIndexOf("/") + 1);

    // Polling function to retrieve the text
    const getReadResult = async () => {
      let result;
      // Poll until the operation status is "succeeded"
      do {
        result = await client.getReadResult(operationId);
        if (result.status === "failed") {
          throw new Error("Text extraction failed.");
        }
        // Wait for a second between polls
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } while (result.status !== "succeeded");

      // Return the extracted text results
      return result.analyzeResult?.readResults;
    };

    // Get and display the extracted text
    const extractedText = await getReadResult();
    console.log("The extracted text is:");
    const textResult = extractedText?.map((page) => page.lines.map((line) => line.text).join("\n")).join("\n\n");

    // Return the extracted text
    return textResult || "No text found";
  } catch (err) {
    console.log("An error occurred:");
    console.error(err);
  }
}

export async function imageDetectionAndStartSession(imageUrl: string, placeId: string) {
  const text = await imageDetection(imageUrl);
  const textWithoutSpaces = text?.replace(/\s+/g, "") || "";

  await prisma.parkingRecord.create({ data: { carNumber: textWithoutSpaces || "", placeId } });
}
