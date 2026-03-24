//individual progress page
export default async function IndividualProgress() {

  const user = await getUser()

  if (!user) {
    redirect("/")
  }
  
  return (
    <div>
      <h1>Individual progress page</h1>
    </div>
  );
}
