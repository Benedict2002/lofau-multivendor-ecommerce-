export const mainCategory=[
    {
        name:"Men",
        categoryId:"men",
        level:1,
        levelTwoCategory:[
            {
                "name":"Topwere",
                "categoryId":"men_topwear",
                "parentCategory":"men",
                "level":2
            },
            {
                "name":"Bottomwere",
                "categoryId":"men_bottomwear",
                "parentCategory":"men",
                "level":2
            },
            {
                "name":"Innerwere And Sleepwere",
                "categoryId":"men_innerwear_and_sleepwear",
                "parentCategory":"men",
                "level":2
            },
            {
                "name":"Footwere",
                "categoryId":"men_footwear",
                "parentCategory":"men",
                "level":2
            }
        ]
    },
    {
        name:"Women",
        categoryId:"women",
        level:1,
        levelTwoCategory:[
            {
                "parentCategoryId":"women",
                "level":2,
                "name":"Kenyan & fusion Wear",
                "categoryId":"women_kenyan_and_fusion_wear"
            },
            {
                "parentCategoryId":"women",
                "level":2,
                "name":"western wear",
                "categoryId":"women_western_wear"
            }
        ]

    },
    {
        name:"Home & Furniture",
        categoryId:"home_furniture",
        level:1
    },
    {
       name:"Electronics",
        categoryId:"electronics",
        level:1  
    }
]