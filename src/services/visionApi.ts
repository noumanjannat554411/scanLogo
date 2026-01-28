import axios from 'axios';
import { GOOGLE_CLOUD_VISION_API_KEY } from '../../config';

export interface Logo {
  description: string;
  score: number;
  boundingPoly: {
    vertices: Array<{ x: number; y: number }>;
  };
}

export interface VisionApiResponse {
  logoAnnotations: Logo[];
}

/**
 * Detect logos in an image using Google Cloud Vision API
 * @param base64Image - Base64 encoded image string
 * @returns Array of detected logos
 */
export const detectLogos = async (base64Image: string): Promise<Logo[]> => {
  try {
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`;

    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: 'LOGO_DETECTION',
              maxResults: 10,
            },
          ],
        },
      ],
    };

    const response = await axios.post(apiUrl, requestBody);

    if (response.data.responses && response.data.responses[0].logoAnnotations) {
      return response.data.responses[0].logoAnnotations;
    }

    return [];
  } catch (error) {
    console.error('Error detecting logos:', error?.response, error);
    throw error;
  }
};

/**
 * Detect text in an image (useful for brand names)
 */
export const detectText = async (base64Image: string): Promise<string[]> => {
  try {
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`;

    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: 'TEXT_DETECTION',
              maxResults: 10,
            },
          ],
        },
      ],
    };

    const response = await axios.post(apiUrl, requestBody);

    if (response.data.responses && response.data.responses[0].textAnnotations) {
      return response.data.responses[0].textAnnotations.map(
        (annotation: any) => annotation.description
      );
    }

    return [];
  } catch (error) {
    console.error('Error detecting text:', error);
    throw error;
  }
};
