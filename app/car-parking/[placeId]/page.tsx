import ParkingForm from "@/components/parking-form";

export default function Page({ params }: { params: { placeId: string } }) {
  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <ParkingForm placeId={params.placeId} />
      </div>
    </>
  );
}
