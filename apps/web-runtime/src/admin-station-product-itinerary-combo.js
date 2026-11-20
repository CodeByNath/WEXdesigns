/* Presentation-only activity steps transcribed from the Owner's references. */
export const comboItineraryGroups = [
  {
    label: 'Natural Bridge Tour',
    steps: [
      { title: 'Gold Coast Pick-Up & Scenic Hinterland Drive', description: 'Begin with pick-up from selected Gold Coast locations and travel inland through the lush Numinbah Valley. Enjoy commentary from your local guide as coastal views give way to rainforest-covered escarpments and rolling countryside.' },
      { title: 'Waterfall Viewing & Light Refreshments', description: 'Visit scenic waterfall locations within Springbrook National Park, including views of Purling Brook Falls and additional cascades (weather and time dependent). During your time in the rainforest, enjoy included light refreshments. Refreshment location and offering may vary depending on seasonal and operational conditions.' },
      { title: 'Guided Natural Bridge Rainforest Walk', description: 'Follow your guide along a formed rainforest track to the Natural Bridge waterfall — a striking natural rock arch where water flows through a basalt cave. Learn about the ancient Gondwana rainforest ecosystem and the geology that shaped this unique formation.' },
      { title: 'Best of All Lookout', description: 'Continue to the Best of All Lookout for sweeping panoramic views across northern New South Wales and Mount Warning. The short walk to the lookout passes through rare Antarctic Beech forest.' },
    ],
  },
  {
    label: 'Hot Air Balloon Flight',
    steps: [
      { title: 'Early Morning Meet & Greet', description: 'Meet our friendly team at the 5-star Sheraton Grand Mirage or enjoy a convenient pickup from your local hotel. Prepare for an early start to catch the best conditions for your adventure.' },
      { title: 'Scenic Transfer to the Launch Site', description: 'Travel in comfort aboard our air-conditioned Go Ballooning coaches to one of over 100 launch sites. Your expert crew selects the perfect takeoff location each day based on the morning’s wind patterns.' },
      { title: 'The Balloon Inflation', description: 'Arrive at the launch field to watch the massive balloon come to life. Experience the excitement as the burners roar and the colorful canopy inflates, getting ready for your sunrise departure.' },
      { title: 'Uplifting Sunrise Flight', description: 'Take to the sky for a breathtaking one-hour flight as the sun rises over the horizon. If you’re celebrating, enjoy some bubbles in the air while taking in the panoramic views of the Gold Coast.' },
      { title: 'Touch Down & Celebration', description: 'Experience a smooth landing and “Touch Down” back on solid ground. Upon landing, you’ll be officially inducted as a “Go Balloonatic” to commemorate your journey.' },
      { title: 'Deflating the Giant', description: 'If conditions are perfect, get a unique behind-the-scenes look at the equipment. You may even have the rare opportunity to walk inside the giant balloon while it is deflating.' },
      { title: 'Five-Star Buffet Breakfast', description: 'Relax on the return coach ride to the Sheraton Grand Mirage Resort. End your morning by enjoying the Gold Coast’s best buffet breakfast before being dropped back at your hotel.' },
    ],
  },
].map((group) => ({ ...group, steps: group.steps.map((step, index) => ({ ...step, number: index + 1 })) }));
