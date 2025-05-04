import { useContext } from 'react';
import { StudentContext } from "@/context/student-context";
import VideoPlayer from "@/components/video-player";
import { Card } from "@/components/ui/card";

function VerticalVideoSection() {
  const { studentViewCoursesList } = useContext(StudentContext);

  // Filter courses that have vertical short-form content
  const shortFormVideos = studentViewCoursesList?.flatMap(course => 
    course.curriculum
      ?.filter(lesson => lesson.format === 'vertical-short')
      .map(lesson => ({
        ...lesson,
        courseName: course.title,
        instructorName: course.instructorName
      }))
  ).filter(Boolean) || [];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Quick Learning Bites</h2>
          <p className="mt-2 text-lg text-gray-600">
            Master concepts in minutes with our bite-sized video lessons
          </p>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
          {shortFormVideos.map((video, index) => (
            <div key={index} className="flex-none w-[250px]">
              <Card className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                <div className="aspect-[9/16] relative">
                  <VideoPlayer
                    url={video.videoUrl}
                    format="vertical-short"
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">{video.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{video.courseName}</p>
                  <p className="text-xs text-gray-400">{video.instructorName}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VerticalVideoSection;