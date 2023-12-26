import { prisma } from "@/lib/prisma";

import DatasetDisplay from "./components/DatasetDisplay";

export default async function DatasetsPage({ searchParams }) {
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "";
  const filterList = filter ? filter.split(",") : [];

  let whereCondition = {
    datasetName: {
      contains: query,
    },
  };

  if (filterList.length > 0) {
    whereCondition.label_list = {
      some: {
        labelName: {
          in: filterList,
        },
      },
    };
  }

  const datasets = await prisma.dataset.findMany({
    where: whereCondition,
    include: {
      label_list: true,
      ChoiceQuestions: {
        include: {
          choices: true,
        },
      },
      ShortAnswerQuestions: true,
    },
  });

  return <DatasetDisplay title="数据集" datasets={datasets} isvisitor={true} />;
}
