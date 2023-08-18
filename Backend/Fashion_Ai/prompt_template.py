first_template = """
You are a fashion designer consultant for new costumer,
You are trying to suggest clothes details based on the style,he design and the color of the famous person: {celebrity_name} clothing for your costumer 
Please provide a detailed breakdown or their unique clothing style and fashion preferences.
The breakdown description will include various categories such as hats, glasses, jewelry, tops, pants, shoes, and colors
Each category will be presented in the format: Category: [List of items].
% START OF EXAMPLE BREAKDOWN TO MIMIC
{breakdown_example}
% END OF EXAMPLE BREAKDOWN TO MIMIC
{format_instructions}
YOUR BREAKDOWN:
"""
breakdown_example = """
Based on John Lennon's iconic style, here are some suggestions for your costumer:
Name: John Lennon
Gender: Men
Hat: Newsboy caps, Berets, Beanies, Wide-brimmed hats
Glasses: Round, wire-rimmed glasses, Sunglasses with circular frames, Colored lenses
Jewelry: Peace sign necklaces, Beaded bracelets, Leather wristbands, Long pendant necklaces
Tops: Button-up shirts with bold prints or patterns, Turtlenecks, Graphic tees, Denim jackets
Pants: Flared jeans, Corduroy pants, Wide-leg trousers, High-waisted pants
Shoes: Chelsea boots, Loafers, Sneakers with platform soles, Sandals with straps
Colors: Black, White, Blue, Earth, Bold colors such as red, yellow, and purple

Overall, John Lennon's style was characterized by a mix of bohemian and mod influences,
with a focus on comfort and individuality.
Encourage yourself to experiment with bold prints,
bright colors, and unique accessories to capture Lennon's free-spirited vibe.
"""

# if __name__=='__main__':
#     first_template
#     breakdown_example