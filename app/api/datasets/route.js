// TODO: Specifically in buid environment (`npm run build && npm run start`), 
// after adding a new dataset, `GET api/datasets` will only return array of datasets not including the newly added one.
// temporary solution is to use `GET api/datasets/randomId` instead of this.
// WEIRD AS FUCKKKKKK

// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//         let dataset = await prisma.Dataset.findMany({
//             include: {
//                 label_list: true,
//                 ChoiceQuestions: {
//                     include: {
//                         choices: true
//                     }
//                 },
//                 ShortAnswerQuestions: true,
//                 starUser: true,
//                 downloadUser: true,
//                 Comment: true,
//                 Tasks: true,
//             }
//         });
//         //console.log(dataset);
//         return new NextResponse(JSON.stringify(dataset), {
//             status: 200,
//             headers: { "Content-Type": "application/json" },
//         });
//     } catch (error) {
//         console.log(error);
//         return new NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }