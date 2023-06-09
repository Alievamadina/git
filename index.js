const jsonfile = require("jsonfile");
const simpleGit = require("simple-git");
const randomInt = require("./random.js").randomInt;

const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();

  const x = randomInt(0, 62);
  const y = randomInt(0, 7);

  const DATE = new Date();

  DATE.setUTCFullYear(DATE.getUTCFullYear() - 1);
  DATE.setDate(DATE.getDate() + 62);
  DATE.setDate(DATE.getDate() + x * 7);
  DATE.setDate(DATE.getDate() + y);

  DATE.setDate(DATE.getDate() + (x * 7 + y + 1));

  const data = {
    date: DATE.valueOf(),
  };

  console.log(DATE);

  jsonfile.writeFile(FILE_PATH, data, () => {
    // git commit --date = ""
    simpleGit()
      .add([FILE_PATH])
      .commit(
        DATE.toISOString(),
        { "--date": DATE.toISOString() },
        makeCommit.bind(this, --n)
      );
  });
};
makeCommit(7000);
