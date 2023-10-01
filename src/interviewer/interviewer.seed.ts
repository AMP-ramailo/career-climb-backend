import { faker } from '@faker-js/faker';
import { Interviewer } from './entities/interviewer.entity';
import { User } from 'src/user/user.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

export const interviewerSeed = async () => {
  try {
    const numRecords = 30;

    for (let i = 0; i < numRecords; i++) {
      const newUser = await User.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image_url: faker.image.avatar(),
        role: 'interviewer',
      });

      const randomExperience = faker.number.int({ min: 0, max: 20 });
      const randomInterviewCount = faker.number.int({ min: 0, max: 20 });
      const randomAddress = faker.location.streetAddress();
      const randomPhone = faker.phone.number();
      const randomCompany = faker.company.name();
      const randomPrice = faker.number.int({ min: 20, max: 1000 });
      const randomDOB = faker.date.birthdate({ min: 18, max: 65 });
      const randomRating = faker.number.int({ min: 0, max: 5 });
      //   const randomUserId = faker.number.int({ min: 1, max: 30 });

      const newInterviewer = await Interviewer.create({
        experience: randomExperience,
        interview_count: randomInterviewCount,
        address: randomAddress,
        phone: randomPhone,
        current_company: randomCompany,
        price: randomPrice,
        dob: randomDOB,
        rating: randomRating,
        user_id: newUser.id,
      });

      const randomDate = faker.date.future(); // Generate a random future date
      const randomTime = await generateNumberWithPattern();
      const randomStatus = faker.number.int({ min: 0, max: 1 }); // Random true or false

      // Create an instance of the Schedule model with random data
      await Schedule.create({
        availability_date: randomDate,
        availability_time: randomTime,
        status: trueOrFalse(randomStatus),
        interviewer_id: newUser.id,
      });

      console.log(`Created Interviewer with ID ${newInterviewer.id}`);
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

async function generateNumberWithPattern() {
  const initial = faker.number.int({ min: 0, max: 23 });
  const later = faker.number.int({ min: 0, max: 59 });

  const initialString = '' + initial;
  const laterString = later < 10 ? `0${later}` : `${later}`;

  const finalTime = initialString + laterString;
  return +finalTime;
}

function trueOrFalse(value: number) {
  return value === 0 ? false : true;
}
