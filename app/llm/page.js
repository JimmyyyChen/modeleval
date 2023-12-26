import { prisma } from "@/lib/prisma";

import ModelDisplay from "./components/ModelDisplay";

export default async function ModelsPage({searchParams}) {
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "";
  const filterList = filter ? filter.split(",") : [];

  let whereCondition = {
    modelName: {
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

  const models = await prisma.model.findMany({
    where: whereCondition,
  });

  return (
    <ModelDisplay models={models} />
  );
}
