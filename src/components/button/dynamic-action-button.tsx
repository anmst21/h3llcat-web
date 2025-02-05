// import React from "react";

// interface Props {}

// const DynamicActionButton: React.FC<Props> = () => {
//   let buttonText = "";
//   let buttonAction = () => {};
//   let disabled = false;

//   console.log(buttonAction, buttonText, disabled);

//   return <div>DynamicActionButton</div>;
// };

// export default DynamicActionButton;

//   {(!ready || !authenticated) && (
//             <button onClick={login} disabled={disableLogin}>
//               {!ready ? "Loading" : "Connect Wallet"}
//             </button>
//           )}
//           {((!isLoadingData &&
//             ready &&
//             authenticated &&
//             userWalletChain === 84532 &&
//             isEnoughFunds) ||
//             (userData && !userData.isMinted && !userData.email)) && (
//             <button onClick={buyNFT}>Mint</button>
//           )}

//           {!isLoadingData &&
//             userData &&
//             userData?.isMinted &&
//             !userData.email &&
//             authenticated && <button type="submit">Submit</button>}

//           {!isLoadingData &&
//             !isEnoughFunds &&
//             ready &&
//             authenticated &&
//             userWalletChain === 84532 &&
//             userWallet && <button disabled>Insuficient funds</button>}

//           {!isLoadingData &&
//             authenticated &&
//             ready &&
//             userData?.isMinted &&
//             userData.email &&
//             isEnoughFunds && <button onClick={buyNFT}>Mint More</button>}

//           {!isLoadingData && userWalletChain && userWalletChain !== 84532 && (
//             <button onClick={() => userWallet.switchChain(baseSepolia.id)}>
//               Switch Chain
//             </button>
//           )}
