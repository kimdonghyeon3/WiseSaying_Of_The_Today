import './App.css';
import {useState, useEffect} from "react";

function App() {

    const [wiseSayings, setWiseSayings] = useState([]);
    const [wiseSayingsIndex, setWiseSayingsIndex] = useState(0);

    const chagneToPrevWiseSaying = () => {
        const newIndex =
            wiseSayingsIndex - 1 >= 0 ? wiseSayingsIndex - 1 : wiseSayings.length - 1;
        setWiseSayingsIndex(newIndex);

        randomColor();
    };
    const chagneToNextWiseSaying = () => {
        const newIndex =
            wiseSayingsIndex + 1 < wiseSayings.length ? wiseSayingsIndex + 1 : 0;
        setWiseSayingsIndex(newIndex);

        randomColor();
    };

    const chagneToAnotherRandomWiseSaying = () => {
        const randomIndex = Math.floor(Math.random() * wiseSayings.length);
        setWiseSayingsIndex(randomIndex);

        randomColor();
    };

    const randomColor = () => {
        var startcolorCode = "#" + Math.round(Math.random() * 0xffffff).toString(16);
        var endColorCode = "#" + Math.round(Math.random() * 0xffffff).toString(16);;
        var color = "linear-gradient(to right," + startcolorCode + "," + endColorCode;

        document.getElementById("bgcolor").style.background = color;
    }

    const loadWiseSayings = async () => {
        const data = await fetch(
            "https://kimdonghyeon3.github.io/javassg/data.json"
        );
        const dataJson = await data.json();

        setWiseSayings(dataJson);

        const randomIndex = Math.floor(Math.random() * dataJson.length);
        setWiseSayingsIndex(randomIndex);
    };

    useEffect(() => {
        loadWiseSayings().then(r => console.log("success"));
    }, []);
//
    if (wiseSayings.length === 0) {
        return (
            <>
                <div className="flex-1 flex items-center justify-center">로딩중...</div>
            </>
        );
    }

////
  return (
    <>
        <div className="fixed top-0 bg-[#ff8686] w-full">
            <div className="text-white p-[30px_20px_20px_10px] text-center text-5xl">
                오늘의 명언
            </div>
        </div>
        <div className="flex-1 flex items-center justify-center" id="bgcolor">
            <div className="max-w-lg px-3">
                <div className="text-center text-gray-500 text-xl">
                    NO. {wiseSayings[wiseSayingsIndex].id}
                </div>
                <div className="mt-5 text-center text-2xl">{wiseSayings[wiseSayingsIndex].content}</div>
                <div className="text-center mt-5 text-gray-500 text-xl">
                    - {wiseSayings[wiseSayingsIndex].author} -
                </div>
            </div>
        </div>
        <div className="fixed bottom-0 bg-[#ff8686] w-full flex justify-between">
            <button
                className="text-white p-[15px_15px_10px_50px] cursor-pointer text-2xl"
                onClick={chagneToPrevWiseSaying}
            >
                <i className="fa-solid fa-angle-left"></i>
            </button>
            <button
                onClick={chagneToAnotherRandomWiseSaying}
                className="text-white p-[15px_15px_10px_15px] cursor-pointer text-2xl"
            >
                <i className="fa-solid fa-rotate-left"></i>
            </button>
            <button
                className="text-white p-[15px_50px_10px_15px] cursor-pointer text-2xl"
                onClick={chagneToNextWiseSaying}
            >
                <i className="fa-solid fa-angle-right"></i>
            </button>
        </div>
    </>
  );
}

export default App;
