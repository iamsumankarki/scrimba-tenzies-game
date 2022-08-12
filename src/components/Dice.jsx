function Die(props) {
  function dotElements(count) {
    const dots = [];
    for (let i = 0; i < count; i++) {
      dots.push(i);
    }

    return dots.map((dot) => <span key={dot} />);
  }

  function diceCount(number) {
    let count;

    switch (number) {
      case 1:
        count = "one";
        break;
      case 2:
        count = "two";
        break;
      case 3:
        count = "three";
        break;
      case 4:
        count = "four";
        break;
      case 5:
        count = "five";
        break;
      case 6:
        count = "six";
    }

    return count;
  }

  return (
    <li
      className={`dice${props.data.isHeld ? " freezed" : ""} ${diceCount(
        props.data.value
      )}`}
      onClick={props.handleClick}
    >
      {dotElements(props.data.value)}
    </li>
  );
}

export default Die;
