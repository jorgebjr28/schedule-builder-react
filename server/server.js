const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');

PORT=8080;

// connect to db
let db;
(async () => {
	db = await open({
		filename: 'data.sqlite',
		driver: sqlite3.Database
	});
})();

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

app.get("/data", async (req,res) => {
	const instructors = await db.all("Select * From instructor");

	const course_names = await db.all("SELECT * FROM course");
	const sections = await db.all("SELECT * FROM section");

	const courses = course_names.map(course => ({
		id: course.id,
		name: course.name,
		sections: sections
			.filter(section => section.course_id === course.id)
			.map(section => ({
				id: section.id,
				instructor: section.instructor_id
			}))
	}));

	res.json({instructors, courses});
})

app.post('/courses/:courseId/newSection', async (req, res) => {
	const {courseId} = req.params;
	const {instructorId} = req.body;
  
	const result = await db.run('INSERT INTO section (course_id, instructor_id) VALUES (?, ?)',	courseId, instructorId);
	const sectionId = result.lastID;
	res.json({ id: sectionId, instructor: instructorId });
});

app.put('/sections/:sectionId', async (req, res) => {
	const { sectionId } = req.params;
	const { instructorId } = req.body;

	await db.run('UPDATE section SET instructor_id = ? WHERE id = ?', instructorId,	sectionId);
	res.json({ id: sectionId, instructor: instructorId });
});

app.delete('/sections/:sectionId', async (req, res) => {
	const { sectionId } = req.params;

	await db.run('DELETE FROM section WHERE id = ?', sectionId);
	res.json({ id: sectionId });
});

app.post('/courses', async (req, res) => {
	const {name} = req.body;

	const result = await db.run('INSERT INTO course (name) VALUES (?)', name);
	const courseId = result.lastID;
	res.json({ id: courseId, name });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
