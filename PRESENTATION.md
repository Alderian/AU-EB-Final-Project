# VC Unicorn Grow Club
Presentation: https://prezi.com/view/b7NJPkY4g4xMt0LQb3rT/

## Start

This is mainly an Escrow with a Governance voting system, but it has some interesting implementation spin. The project aims to join VC and Unicorns together to make good ideas real!
We start by stating what VC and UInicorns are, or at least for this product; then we efine a security environment and for the last part we sum up the main technical characteristics.
This presentation has a written script and also it has an extended version for diving into the different technologies and how we implement every part.

## Venture Capital

Let's start with VC Definition
> Venture capital (VC) is a form of private equity and a type of financing that investors provide to startup companies and small businesses that are believed to have long-term growth potential. Venture capital generally comes from well-off investors, investment banks, and other financial institutions.
So, they are people with money that wants to invest in Startups that might have growth potential.
They need to solve these problems:
1. **Selection**. Tell which project to choose.
2. **Funding**. Give out money with efficiency.
3. **Control the progress**. Have a way to control the money flow with the startup progress.
4. **Investment return**. Have an easy and fast way to get returns.

## Unicorn

Now, can we define a Unicorn? Well maybe, but for this project, we are talking about very interesting Startups that have great potential to become the next Unicorns in the space.
They need:
1. **Funding**. They need a bunch of money to boost the project to reach the goal faster.
2. **Time to market**. If they cannot deliver on time, they might miss the opportunity.
3. **Experienced support**. They need knowledge of how to become known and trend.
   - Marketing, Contacts, and community are crucial.

## Security and Data Protection

As this project will have all transactions on the blockchain, the data will be publish (if you know contract or owner addresses) Also there is a lot of money involved, So here are the ways we face security and data protection:
1. **NFT soulbound**. This is for permission to access to the application. Works like an ACL. The NFT is soulbound so it cant be transfer or sold, also, every NFT has properties to determine role.
2. **DAO**. Project aims to be a Desentralized Autonomous Organization. So any future change should pass a vote from the club members.
3. **Gobernance Voting System**. Project has a voting system using well known governance contracts. Every new startup funding instance is created after a vote.
4. **Audited contract libraries**. We use well known full audited contract libraries. Also our contracts are verified for transparency.
5. **Private on-chain interviews**. VCs And StartUps need to have interviews. Thouse are streamed on-chain to enforce security.

## How it works

The project has several parts, but it aims to be simple and yet complete
Governance Voting System. The startups goes thru a process were they have to enrole and try to convince the VC, then the club votes if they will invest or not in that project.
1. **Money stream**. This technic ensures that the money flows as needed, but also the reserve can be use for other things too.
2. **Smart wallets**. We store the money in smart wallets that are contracts prepared for this functionality.
3. **Vaulted money**. The money in the Smart wallet is stored in well known vaults so it is earning while sitting there.
4. **Tokenized**. The Stratup needs to provide a way to mint NFTs or Tokens as a presale for the VCs.

There is an Escrow contract that takes charge of orchestrate the money flow… when money is delivered to the Startup, preminted Tokens/NFT goes for the VCs smart wallet.
There is also a voting system to set a sell price to get the money back.
