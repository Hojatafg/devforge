// Netlify Function: Process Order
// Triggered after successful Stripe payment
// Generates portrait via FAL API and handles delivery

const FAL_KEY = process.env.FAL_KEY;

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { style, product, name, email, petName, petType, customText, imageUrl } = body;

    // Validate required fields
    if (!style || !email || !imageUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: style, email, imageUrl' })
      };
    }

    // Style prompts (matching the tested prompts from our skill)
    const stylePrompts = {
      renaissance: `Renaissance oil painting portrait of a ${petType || 'beloved pet'} wearing an ornate gold crown with jewels and a rich red velvet ermine-trimmed royal cape, baroque dark background, dramatic Rembrandt-style chiaroscuro lighting, detailed fur texture, gold filigree details, museum quality masterpiece, hyperrealistic, 4K`,
      knight: `Portrait of a brave ${petType || 'beloved pet'} wearing ornate medieval knight armor with golden epaulets, a crown, and a white cape with red cross, standing proudly in a castle hall, dramatic heroic lighting, detailed metal reflections, regal military portrait style, hyperrealistic, 4K`,
      victorian: `Victorian-era watercolor portrait of a fluffy ${petType || 'beloved pet'} with a delicate lace collar, soft pastel colors, antique paper texture, gentle garden background with roses, elegant English countryside aesthetic, light airy composition, vintage frame, 4K`,
      premium: `Double royal portrait of ${name || 'a person'} and their ${petType || 'beloved pet'}, both wearing matching Renaissance royal attire with gold crowns and velvet capes, warm golden lighting, ornate palace background, loving bond captured in Old Masters painting style, museum quality, 4K`
    };

    const prompt = stylePrompts[style] || stylePrompts.renaissance;

    // Call FAL API to generate the portrait
    const falResponse = await fetch('https://fal.run/fal-ai/flux-2-pro', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        image_size: 'landscape_4_3',
        output_format: 'jpeg',
        enable_safety_checker: false
      })
    });

    if (!falResponse.ok) {
      const errorText = await falResponse.text();
      throw new Error(`FAL API error: ${falResponse.status} - ${errorText}`);
    }

    const falData = await falResponse.json();
    const portraitUrl = falData.images[0].url;
    const seed = falData.seed;

    // TODO: Upload portrait to Cloudinary for permanent storage
    // TODO: Send confirmation email via SendGrid

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        portraitUrl: portraitUrl,
        seed: seed,
        message: 'Portrett generert! Sjekk e-posten din for forhåndsvisning.'
      })
    };

  } catch (error) {
    console.error('Process order error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Kunne ikke generere portrettet. Vennligst prøv igjen.',
        details: error.message
      })
    };
  }
};
