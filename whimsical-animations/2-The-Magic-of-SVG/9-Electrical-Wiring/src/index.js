import { random } from "lodash";
import "./reset.css";
import "./styles.css";

const path1 = document.querySelector(".line.one");
const path2 = document.querySelector(".line.two");
const path3 = document.querySelector(".line.three");

const paths = [path1, path2, path3];

paths.forEach((path, index) => {
	const pathLength = path.getTotalLength();
	path.style.setProperty("--path-length", -pathLength);
	path.style.setProperty("--path-speed", `${pathLength / 70}s`);
	path.style.setProperty("--delay", `${random(0, 500) + index * 200}ms`);
	path.style.setProperty("--wiggle-duration", `${random(2000, 5000)}ms`);
});

/*
  PATH CHEATSHEET

  Getting the length of a path:
    path.getTotalLength();

  Setting stroke attributes in JavaScript:
    path.style.strokeDasharray = '10px, 1000px';
    path.style.strokeDashoffset = '20px';
*/
