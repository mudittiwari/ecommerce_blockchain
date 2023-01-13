//SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Ecommerce {
    mapping(uint256 => Product) public products;
    mapping(string => User) public users;
    uint256 public counter;
    uint256 public usercounter;
    constructor() public {
        counter = 1;
        usercounter=1;
    }

    struct Person {
        string name;
        uint256 age;
        string gender;
    }
    // orders structure
    struct Product {
        uint256 id;
        string title;
        uint256 price;
        string desc;
        string quantity;
        string image;
        address created_by;
    }
    struct User {
        uint256[] cartitems;
        Person[] family_members;
        string name;
        string phone_number;
        string address_;
        string gender;
        uint256 age;
    }
    event productcreated(
        uint256 id,
        string title,
        uint256 price,
        string desc,
        string image,
        string quantity,
        address author
    );

    function createproduct(
        string memory title,
        uint256 price,
        string memory desc,
        string memory quantity,
        string memory image
    ) public {
        uint256 id = counter;
        Product storage product = products[id];
        product.id = id;
        product.title = title;
        product.price = price;
        product.desc = desc;
        product.image = image;
        product.quantity = quantity;
        product.created_by = msg.sender;
        emit productcreated(
            id,
            title,
            price,
            desc,
            image,
            quantity,
            msg.sender
        );
        counter++;
    }




    event usercreated(string name,string phone_number,string address_,string gender,uint256 age,uint256 counter,address author);
    function createuser(
        string memory name,
        string memory phone_number,
        string memory address_,
        string memory gender,
        uint256 age
    ) public {
        User storage user = users[phone_number];
        user.name = name;
        user.phone_number = phone_number;
        user.address_ = address_;
        user.age = age;
        user.gender = gender;
        
        emit usercreated(name,phone_number,address_,gender,age,usercounter,msg.sender);
        usercounter++;
    }

    event member_added(string name,uint256 age,string gender,address author);
    function addfamilymember(string memory phone_number,string memory name,uint256 age,string memory gender) public
    {
        User storage user=users[phone_number];
        Person memory person; 
        person.age=age;
        person.gender=gender;
        person.name=name;
        user.family_members.push(person);
        emit member_added(user.family_members[0].name,user.family_members[0].age,user.family_members[0].gender,msg.sender);
    }
    function getfamilymembers(string memory phone_number) public view returns (Person[] memory)
    {
        User storage user=users[phone_number];
        return user.family_members;
    }
}
