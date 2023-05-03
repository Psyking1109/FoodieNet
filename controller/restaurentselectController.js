const Restaurent = require('../models/restaurentData');

async function showCombos(req, res) {
  const { budget, people } = req.body;

  try {
    const restaurants = await Restaurent.find().lean();

    const combos = [];
    for (const restaurant of restaurants) {
      const mainCourses = restaurant.menu.filter(item => item.type === 'Main_course');
      const sideDishes = restaurant.menu.filter(item => item.type === 'sidedish');
      const setMenus = restaurant.menu.filter(item => item.type === 'setmenu');

      const selectedItems = [];
      let itemTypeCounts = {
        Main_course: 0,
        sidedish: 0,
        setmenu: 0,
        starter: 0,
        desert: 0,
        beverage: 0
      };

      for (const mainCourse of mainCourses) {
        for (const sideDish of sideDishes) {
          const combo = {
            restaurantName: restaurant.restaurentName,
            items: [mainCourse, sideDish],
            itemType: ['Main_course', 'sidedish'],
            totalPrice: mainCourse.price + sideDish.price
          };

          let remainingBudget = budget - combo.totalPrice;

          if (remainingBudget > 0) {
            const starters = restaurant.menu.filter(item => item.type === 'starter');
            const desserts = restaurant.menu.filter(item => item.type === 'desert');
            const beverages = restaurant.menu.filter(item => item.type === 'beverage');

            const itemTypeLimits = {
              Main_course: 1,
              sidedish: 1,
              setmenu: people < 2 ? 1 : 0,
              starter: people,
              desert: people,
              beverage: people
            };

            for (const itemType of ['starter', 'desert', 'beverage', 'setmenu']) {
              const items = restaurant.menu.filter(item => item.type === itemType);
              const limit = itemTypeLimits[itemType];

              for (const item of items) {
                if (itemTypeCounts[itemType] < limit && remainingBudget >= item.price) {
                  selectedItems.push(item);
                  combo.itemType.push(item.type);
                  combo.totalPrice += item.price;
                  remainingBudget -= item.price;
                  itemTypeCounts[itemType]++;
                }
              }
            }
          }

          if (combo.totalPrice <= budget && combo.items.length + selectedItems.length >= 2 * people) {
            if (setMenus.length > 0 && itemTypeCounts.setmenu === 0) {
              combo.items.push(setMenus[0]);
              combo.itemType.push('setmenu');
              combo.totalPrice += setMenus[0].price;
              itemTypeCounts.setmenu++;
            }

            combo.items = combo.items.concat(selectedItems.slice(0, 2 * people - combo.items.length));
            combos.push(combo);
          }
        }
      }
    }

    res.json(combos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

module.exports = {
  showCombos
};
