import {ethers} from 'hardhat';
import {expect} from 'chai';
import {VCUnicornGrowClub as TVCUnicornGrowClub, VCUnicornGrowClub__factory} from 'typechain-types';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';

describe('VCUnicornGrowClub', () => {
    let vcUnicornGrowClub: TVCUnicornGrowClub;
    let deployer: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, user3: SignerWithAddress;

    async function deployContract() {
        [deployer, user1, user2, user3] = await ethers.getSigners();

        const factory = await ethers.getContractFactory('VCUnicornGrowClub');
        const contract = await factory.deploy();
        await contract.deployed();
        return contract;
    }

    before(async () => {
        vcUnicornGrowClub = await deployContract();
    });

    describe('Deploy', () => {
        it('Should return the name and ticker', async function () {
            expect(await vcUnicornGrowClub.name()).to.equal('VCUnicornGrowClub');
            expect(await vcUnicornGrowClub.symbol()).to.equal('VUG');
            expect(await vcUnicornGrowClub.totalSupply()).to.equal(0);
            expect(await vcUnicornGrowClub.owner()).to.equal(deployer.address);
            expect(await vcUnicornGrowClub.balanceOf(deployer.address)).to.equal(0);
        });
    });

    describe('Deploy', () => {
        it('Should mint a new soul for user 1', async function () {
            const tx = await vcUnicornGrowClub.safeMint(user1.address, 'https://alderian.tk');

            await tx.wait(1);
            await expect(tx)
                .to.emit(vcUnicornGrowClub, 'Transfer')
                .withArgs(ethers.constants.AddressZero, user1.address, '0');

            await expect(tx).to.emit(vcUnicornGrowClub, 'Attest').withArgs(user1.address, '0');

            expect(await vcUnicornGrowClub.totalSupply()).to.be.equal(1);

            expect(await vcUnicornGrowClub.ownerOf(0)).to.equal(user1.address);
        });

        it('Should mint a new soul for user 2', async function () {
            const tx = await vcUnicornGrowClub.safeMint(user2.address, 'https://alderian.tk');

            await tx.wait(1);
            await expect(tx)
                .to.emit(vcUnicornGrowClub, 'Transfer')
                .withArgs(ethers.constants.AddressZero, user2.address, '1');

            await expect(tx).to.emit(vcUnicornGrowClub, 'Attest').withArgs(user2.address, '1');

            expect(await vcUnicornGrowClub.totalSupply()).to.be.equal(2);

            expect(await vcUnicornGrowClub.ownerOf(0)).to.equal(user1.address);
            expect(await vcUnicornGrowClub.ownerOf(1)).to.equal(user2.address);
        });
    });

    describe('Enforced SBT cant transfer', () => {
        it('Should NOT be transferable by NFT owner 1', async function () {
            await expect(
                vcUnicornGrowClub.connect(user1).transferFrom(user1.address, user2.address, 0)
            ).to.revertedWith('Token transfer is BLOCKED');

            await expect(
                vcUnicornGrowClub
                    .connect(user1)
                    ['safeTransferFrom(address,address,uint256)'](user1.address, user2.address, 0)
            ).to.revertedWith('Token transfer is BLOCKED');
        });

        it('Should NOT be transferable by NFT owner 2', async function () {
            await expect(
                vcUnicornGrowClub.connect(user2).transferFrom(user2.address, user3.address, 1)
            ).to.revertedWith('Token transfer is BLOCKED');

            await expect(
                vcUnicornGrowClub
                    .connect(user2)
                    ['safeTransferFrom(address,address,uint256)'](user2.address, user3.address, 1)
            ).to.revertedWith('Token transfer is BLOCKED');
        });
    });

    describe('Burn and Revoke for ACL', () => {
        it('Should NOT be burneable by contract owner', async function () {
            await expect(vcUnicornGrowClub.connect(deployer).burn(0)).to.revertedWith('Only token owner can burn it');
            await expect(vcUnicornGrowClub.connect(deployer).burn(1)).to.revertedWith('Only token owner can burn it');
        });

        it('Should NOT be revoked by NFT owner 1', async function () {
            await expect(vcUnicornGrowClub.connect(user1).revoke(0)).to.revertedWith(
                'Ownable: caller is not the owner'
            );
        });

        it('Should NOT be revoked by NFT owner 2', async function () {
            await expect(vcUnicornGrowClub.connect(user2).revoke(1)).to.revertedWith(
                'Ownable: caller is not the owner'
            );
        });

        it('Should be burneable by NFT owner 1', async function () {
            const tx = await vcUnicornGrowClub.connect(user1).burn(0);

            await tx.wait(1);
            await expect(tx)
                .to.emit(vcUnicornGrowClub, 'Transfer')
                .withArgs(user1.address, ethers.constants.AddressZero, '0');
        });

        it('Should be revoked by contract owner', async function () {
            const tx = await vcUnicornGrowClub.connect(user2).burn(1);

            await tx.wait(1);
            await expect(tx)
                .to.emit(vcUnicornGrowClub, 'Transfer')
                .withArgs(user2.address, ethers.constants.AddressZero, '1');

            await expect(tx).to.emit(vcUnicornGrowClub, 'Revoke').withArgs(user2.address, '1');
        });
    });
});
