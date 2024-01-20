export default function CheckBox() {
  const onClickCheckSpan = () => {
    alert("체크박스를 구성하는 Span 영역");
  };

  const onClickCheckBox = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    alert("체크 박스 Input");
  };

  return (
    <span onClick={onClickCheckSpan}>
      <input type="checkbox" onClick={onClickCheckBox} />
    </span>
  );
}
