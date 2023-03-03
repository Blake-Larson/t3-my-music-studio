import React, { useState } from "react";
import { api } from "../utils/api";
import Layout from "../components/layout/Layout";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";
import StudentCard from "../components/students/StudentCard";
import CreateStudent from "../components/students/CreateStudent";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export type StudentType = {
  lesson: Lesson[];
  music: Music[];
  work: Work[];
  id: string;
  name: string;
  email: string | null;
  image: string | null;
  age: number | null;
  phone: string | null;
  contact: string | null;
  instrument: string | null;
  status: boolean;
};

const StudentsPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [students, setStudents] = useState<StudentType[]>([]);
  const getStudents = api.student.getStudents.useQuery(undefined, {
    onSuccess: (data) => {
      setStudents(data);
    },
  });

  return (
    <>
      <Layout title="Students">
        <div>
          {getStudents.isLoading && (
            <button className="loading btn mt-5 self-center">loading</button>
          )}
          <div
            className={`flex w-full flex-col items-center gap-5 ${
              showForm ? "hidden" : "block"
            }`}
          >
            <div className="flex w-full flex-col gap-5 rounded-xl bg-primary p-5 shadow-lg">
              <h2 className="text-center text-2xl font-semibold text-base-100 md:text-3xl">
                Student List
              </h2>
              <ul className="flex gap-5 border-t border-base-100 border-opacity-50 p-5">
                {getStudents.isLoading && (
                  <button className="loading btn-square btn mt-5 self-center"></button>
                )}
                {students?.map((student) => {
                  return <StudentCard key={student.id} student={student} />;
                })}
              </ul>
            </div>
          </div>
          <button
            className={showForm ? "btn-error btn" : "btn-secondary btn"}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add a student"}
          </button>
          <div className={showForm ? "block" : "hidden"}>
            <CreateStudent
              students={students}
              setStudents={setStudents}
              setShowForm={setShowForm}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default StudentsPage;
