import { prisma } from "@/lib/prisma";

import DatasetDisplay from "./components/DatasetDisplay";

export default async function DatasetsPage({searchParams}) {
  const query = searchParams?.query || '';
  const filter = searchParams?.filter || '';

  const datasets = await prisma.dataset.findMany({
    where: {
      datasetName: {
        contains: query,
      },
    },
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
