import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(
  request: Request,
  { params }: { params: { cabinId: number } }
) {
  const { cabinId } = params;

  try {
    const [cabin, bookDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({
      cabin,
      bookDates,
    });
  } catch (error) {
    return Response.json({
      message: "Cabin not found",
    });
  }

  return Response.json({
    test: "test",
  });
}
