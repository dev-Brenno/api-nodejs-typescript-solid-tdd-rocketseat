import { Submission } from "../../domain/entities/submission"
import { StudentsRepository } from "../repositories/StudentsRepository"
import { ChallengesRepository } from "../repositories/ChallengesRepository"

type CreateChallengeSubmissionRequest = {

    studentId: string
    challengeId: string


}

export class CreateChallengeSubmission {

    constructor(
        private StudentsRepository: StudentsRepository,
        private ChallengesRepository: ChallengesRepository,
        ) {}
    
    async execute( { studentId, challengeId }: CreateChallengeSubmissionRequest ) {

        const student = await this.StudentsRepository.findById(studentId)

        if (!student) {
            
            throw new Error('Student does not exists.')
        
        }

        const challenge = await this.ChallengesRepository.findById(challengeId)

        if (!challenge) {

            throw new Error('Challenge does not exists.')

        }

        const submission = Submission.create({

            studentId,
            challengeId

        })

        return submission

    }

}