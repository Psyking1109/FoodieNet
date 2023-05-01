const mongoose = require('mongoose');
const Restaurent = require('../models/restaurentData');

const getRestaurentByBudget = async (req, res) => {
    const budget = Number(req.body.budget);
  const peopleCount = Number(req.body.peopleCount);
  const menuCombos = [];

  try {
    const restaurants = await Restaurent.find();
    //console.log("restaurants",JSON.stringify(restaurants, null, 2));
    // Find all main course and side dish combos
    const mainCourseandSideDishCombos = [];
    for (const restaurant of restaurants) {
      for (const mainCourse of restaurant.menu.filter(item => item.type === 'Main_course' && item.price <= budget && item.serves >= peopleCount)) {
        for (const sideDish of restaurant.menu.filter(item => item.type === 'sidedish' && item.price <= (budget - mainCourse.price) && item.serves >= peopleCount)) {
            //console.log("SideDish ",sideDish)
            mainCourseandSideDishCombos.push({
            mainCourse: mainCourse.item,
            mainCoursePrice: mainCourse.price,
            sideDish: sideDish.item,
            sideDishPrice: sideDish.price,
            total: mainCourse.price + sideDish.price,
            restaurant: restaurant.name
          });
        }
      }
    }

    // Find all set menus
    const setMenus = restaurants.flatMap(restaurant =>
      restaurant.menu.filter(item => item.type === 'setmenu' && item.price <= budget && item.serves >= peopleCount)
      .map(item => ({
        setMenu: item.item,
        setMenuPrice: item.price,
        totalPrice: item.price,
        restaurant: restaurant.name
      }))
    );
   // console.log("SetMenus - ",setMenus)

    // Find all optional items
    const optionalItems = [];
    for (const restaurant of restaurants) {
      for (const optionalItem of restaurant.menu.filter(item => ['starter','desert','beverage'].includes(item.type) && item.price <= budget)) {
        optionalItems.push({
          name: optionalItem.item,
          price: optionalItem.price,
          restaurant: restaurant.name
        });
      }
    }

    // Combine main course and side dish combos with optional items
    const combosWithOptionalItems = mainCourseandSideDishCombos.map(combo => {
      let totalPrice = combo.total;
      const optionalItemChoices = [];

      for (const optionalItem of optionalItems) {
        if (optionalItem.price <= (budget - combo.totalPrice)) {
          optionalItemChoices.push({
            name: optionalItem.name,
            price: optionalItem.price,
            restaurant: optionalItem.restaurant
          });
          totalPrice += optionalItem.price;
        }
      }

      return {
        ...combo,
        optionalItems: optionalItemChoices,
        totalPrice
      };
    });

    // Combine set menus with optional items
    const setMenusWithOptionalItems = setMenus.map(setMenu => {
      let totalPrice = setMenu.totalPrice;
      const optionalItemChoices = [];

      for (const optionalItem of optionalItems) {
        if (optionalItem.price <= (budget - setMenu.totalPrice)) {
          optionalItemChoices.push({
            name: optionalItem.name,
            price: optionalItem.price,
            restaurant: optionalItem.restaurant
          });
          totalPrice += optionalItem.price;
        }
      }

      return {
        ...setMenu,
        optionalItems: optionalItemChoices,
        totalPrice
      };
    });

    // Combine all combos and set menus with optional items
    const allCombos = [...combosWithOptionalItems, ...setMenusWithOptionalItems];

    // Sort combos and set menus by total price
    allCombos.sort((a, b) => a.totalPrice - b.totalPrice);

  //  console.log('allCombos',allCombos)
    // Create a list of restaurant names to avoid duplicates
const restaurantNames = [];

// Choose the top 3 combos with the lowest total price and no duplicate restaurants
for (const combo of allCombos) {
  if (menuCombos.length === 3) {
    break;
  }
  
  if (!restaurantNames.includes(combo.restaurant)) {
    restaurantNames.push(combo.restaurant);
    menuCombos.push(combo);
  }
}

res.status(200).json(menuCombos);
} catch (error) {
    res.status(500).json({ message: 'Server error: ' + error });
    }
    };
    
   
 module.exports = { 
    getRestaurentByBudget 
};

   
