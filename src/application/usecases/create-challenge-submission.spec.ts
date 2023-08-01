import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/student";
import { InMemoryChallengesRepository } from "../../tests/repositories/in-memory-challenges-repository";
import { InMemoryStudentsRepository } from "../../tests/repositories/in-memory-students-repository"
import { CreateChallengeSubmission } from "./create-challenge-submission"

describe("Create challenge submission use case", () => {

    it("should be able to create a new challenge submission", async () => {

        const StudentsRepository = new InMemoryStudentsRepository()

        const ChallengesRepository = new InMemoryChallengesRepository()

        const student = Student.create({
            name: "Brenno",
            email: "emailtext@teste.com"
        })

        const challenge = Challenge.create({

            title: "Challenge 001",
            instructionsUrl: "http://example.com"

        })

        StudentsRepository.items.push(student)
        ChallengesRepository.items.push(challenge)
        
        const sut = new CreateChallengeSubmission(

            StudentsRepository,
            ChallengesRepository

        )

        const response = await sut.execute({

            studentId: student.id,
            challengeId: challenge.id

        })

        expect(response).toBeTruthy()

    })

})