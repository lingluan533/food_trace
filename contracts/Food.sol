// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;



contract Food{
   
    enum FoodCondition { Normal, Recall }

    uint public FoodIndex;
    
    mapping (uint => Food) stores;
   
  
    struct Food{
        uint id;
        string foodName;//食品名
        string productDate; //
        uint exp; 
        string manufacturer;
        uint advicePrice;   
        string serialNumber;
        FoodCondition condition; //狀態
        string imgHash;
       
    } 

   
    event NewFood(uint _FoodIndex);
    constructor() public{
        FoodIndex = 0;
    }
    
    function getIndex() public view returns(uint ){
        return(FoodIndex);
    }
    function addFoodToStore(string foodName, string productDate, uint exp, string manufacturer
        , uint advicePrice, string serialNumber,uint condition ,string imgHash) public {
       FoodIndex+=1;
        Food memory food = Food(FoodIndex, foodName, productDate, exp, manufacturer
            , advicePrice,serialNumber, FoodCondition(condition),imgHash);
        stores[FoodIndex] = food;  
        emit NewFood(FoodIndex);
    }
    function getFood(uint _FoodId) public view returns (string, string, uint, string, uint, string,  FoodCondition,string){
        Food memory food = stores[_FoodId];
        return (food.foodName, food.productDate, food.exp, food.manufacturer, food.advicePrice
            ,food.serialNumber, food.condition,food.imgHash);    
    }
    // function updatePosition(uint _FoodId,string _newPosition) public returns(bool){
    //      Food storage Food = stores[_FoodId];
    //     Food.position = _newPosition;
    //     return true;
    // }


}