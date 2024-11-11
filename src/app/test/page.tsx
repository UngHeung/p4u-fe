import Card from "@/components/card/Card";

const content = `
  1. 기도제목 하나
  2. 기도제목 둘
`;

const TestPage = () => {
  return (
    <>
      <Card
        writer={{ id: 0, name: "오흥식" }}
        title={"기도제목"}
        content={content}
        intercessors={[0, 1, 2]}
        tags={["직장", "취업", "취업하게해주세요", "개발자", "집가까운곳", "복지"]}
        answered={false}
      />
      <br />
      <Card
        writer={{ id: 0, name: "오흥식" }}
        title={"기도제목"}
        content={content}
        intercessors={[0, 1, 2]}
        tags={["태그1", "태그2"]}
        answered={true}
      />
    </>
  );
};

export default TestPage;
