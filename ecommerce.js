const { assert } = require('chai');

const Ecommerce = artifacts.require("Ecommerce");

require('chai').use(require('chai-as-promised')).should();


contract('Ecommerce', ([deployer, author, tipper]) => {
    let ecommerce;
    before(async () => {
        ecommerce = await Ecommerce.deployed();
    }
    );
    describe('deployment', () => {
        let product,productcounter,user,usercounter,member;
        before(async () => {
            product = await ecommerce.createproduct('sugar', 200, "this is the first product", "200", "test image", { from: author });
            user=await ecommerce.createuser('mudit tiwari',"94135655045","scheme 8","male",18,{ from: author });
            member=await ecommerce.addfamilymember('94135655045',"nimit",10,"male",{ from: author });
            productcounter = await ecommerce.counter();
            usercounter=await ecommerce.usercounter();

        }
        );
        it('deploys successfully', async () => {
            const address = await ecommerce.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);

        }

        );
        it('creates posts', async () => {

            // assert.equal(postcounter, 1);
            let event = product.logs[0].args;
            assert.equal(event.id.toNumber(), productcounter.toNumber() - 1, 'id is correct');
            assert.equal(event.title, 'sugar', 'Title is correct');
            assert.equal(event.author, author, 'author is correct');
            assert.equal(event.price, 200, 'price is correct');
            assert.equal(event.desc, "this is the first product", 'description is correct');
            assert.equal(event.quantity, "200", 'quantity is correct');
            assert.equal(event.image, 'test image', 'image is correct');
        }
        );

        it('creates user', async () => {

            // assert.equal(postcounter, 1);
            let event = user.logs[0].args;
            assert.equal(event.counter.toNumber(), usercounter.toNumber()-1, 'user counter is correct');
            assert.equal(event.name, 'mudit tiwari', 'name is correct');
            assert.equal(event.author, author, 'author is correct');
            assert.equal(event.phone_number, 94135655045, 'phone number is correct');
            assert.equal(event.address_, "scheme 8", 'address is correct');
            assert.equal(event.gender, "male", 'gender is correct');
            assert.equal(event.age, 18, 'age is correct');
        }
        );

        it('add family member', async () => {

            // assert.equal(postcounter, 1);
            let event = member.logs[0].args;
            
            assert.equal(event.name, 'nimit', 'name is correct');
            assert.equal(event.author, author, 'author is correct');
            
            assert.equal(event.gender, "male", 'gender is correct');
            assert.equal(event.age, 10, 'age is correct');
        }
        );



    }
    );
});