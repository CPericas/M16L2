import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, ListGroup } from "react-bootstrap";

interface Comment {
    title: string
    body: string
}

const CommentForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const storedComments = localStorage.getItem('comment');
        if (storedComments) {
            setComments(JSON.parse(storedComments));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !body) return;

        const newComment = { title, body };
        const updatedComments = [...comments, newComment];

        setComments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
        setTitle('');
        setBody('');
    };

    return (
        <Container className="mt-4" >
            <h2 className="text-center mb-4">Post a Comment</h2>

            <Card className="p-4 shadow-sm">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter your comment"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows={3}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Submit
                    </Button>
                </Form>
            </Card>

            {comments.length > 0 && (
                <div className="mt-4">
                    <h3>Previous Comments</h3>
                    <ListGroup>
                        {comments.map((comment, index) => (
                            <ListGroup.Item key={index}>
                                <strong>{comment.title}</strong>: {comment.body}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            )}
        </Container>
    );
};

export default CommentForm;