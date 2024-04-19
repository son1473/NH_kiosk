  import { ethers } from "ethers";
  import { address } from "../utils/ContractInfo";
  import abi from "../utils/CritPortal.json";

  declare var window: any;

  const contractAddress = address;
  const contractABI = abi.abi;

  const openQuestion = async (id: string, reward: number) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const critPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // await signer.sendTransaction({
        //   to: contractAddress,
      //   value: ethers.utils.parseEther("0.01"),
      //   gasPrice: 8000000000,
      // });

      let result = await critPortalContract.openQuestion(
        id,
        BigInt(reward * 1000000000 * 1000000000),
        {
          value: ethers.utils.parseEther(`${reward}`),
        }
      ); // 0.01 ether
      await result.wait(); // waiting till mine complete
      let after = await critPortalContract.getQuestionById(id);

      console.log(after);

      return true;
    } else {
      console.log("Ethereum object doesn't exist!");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const closeQuestion = async (questionId: string) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const critPortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      let before = await critPortalContract.getQuestionById(questionId);

      let result = await critPortalContract.closeQuestion(questionId);

      let after = await critPortalContract.getQuestionById(questionId);

      console.log(before, after);
      return true;
    } else {
      console.log("Ethereum object doesn't exist!");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
  // 서버에서 isClosed 로직 넣기
};

const chooseAnswer = async (questionId: string, winnerAddress: string) => {
  try {
    console.log("start");
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const critPortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      console.log("start22");
      console.log(await critPortalContract.getQuestionById(questionId));
      console.log("start2233");
      let tx = await critPortalContract.chooseAnswer(questionId, winnerAddress);
      console.log("start33");
      await tx.wait();
      console.log("start44");
      return true;
    } else {
      console.log("Ethereum object doesn't exist!");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const contractService = {
  openQuestion,
  closeQuestion,
  chooseAnswer,
};

export default contractService;
